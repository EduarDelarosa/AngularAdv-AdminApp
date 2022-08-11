import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, map, catchError, delay } from 'rxjs/operators';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuario.interface';

declare const google: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) { }


  get uid(): string {
    return this.usuario?.uid || '';
  }

  get headers() {
    return {
      headers: {
      'x-token': this.token
    }
  }
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, this.headers ).pipe(
      map( ( resp:any ) => {
        const { email, google, nombre, role, img, uid } = resp.usuarioDB;
        this.usuario = new Usuario( nombre, email, '', role, google, img, uid );
        localStorage.setItem( 'token', resp.token );
        return true;
      }),
      catchError( () => of(false) )
     );

  }

  crearUsuario( formData: RegisterForm ){
    return this.http.post(`${base_url}/usuarios`, formData)
                .pipe(
                  tap( ( res: any ) => {
                    localStorage.setItem( 'token', res.token );
                  })
                )
  }

  actualizarUsuario( data: { nombre: string, email: string, role: any } ){

    data = {
      ...data,
      role: this.usuario.role,
    }

    return this.http.put(`${base_url}/usuarios/${ this.uid }`, data, this.headers);
  }

  login( formData: LoginForm ){
    return this.http.post(`${base_url}/login`, formData)
                .pipe(
                  tap( ( res: any ) => {
                    localStorage.setItem( 'token', res.token );
                  })
                )
  }

  loginGoogle( token: string ){
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap( ( res: any ) => {
          localStorage.setItem( 'token', res.token );
        })
      )
  }

  logout(){
    localStorage.removeItem( 'token' );


    google.accounts.id.revoke('eduardelarosa09@gmail.com', () =>{

        this.router.navigateByUrl('/login');

    });
  }

  cargarUsuarios( desde: number = 0 ) {
    const url = `${ base_url }/usuarios?desde=${ desde }`;
    return this.http.get<CargarUsuario>( url, this.headers )
                  .pipe(
                    map( resp => {
                      const usuarios = resp.usuarios.map(
                        user => new Usuario( user.nombre, user.email, '', user.role, user.google, user.img, user.uid  ))

                      return {
                        total: resp.total,
                        usuarios
                      };
                    })
                  )

  }


  eliminar( usuario: Usuario ){
    const url = `${ base_url }/usuarios/${ usuario.uid }`;
    return this.http.delete( url, this.headers );
  }

  actualizarRole( usuario: Usuario){

    return this.http.put(`${base_url}/usuarios/${ usuario.uid }`, usuario, this.headers);

  }

}
