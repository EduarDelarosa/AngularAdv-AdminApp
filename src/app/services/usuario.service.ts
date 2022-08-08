import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, map, catchError } from 'rxjs/operators';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

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

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
     }).pipe(
      map( ( resp:any ) => {
        const { email, google, nombre, role, img, uid } = resp.usuarioDB;
        this.usuario = new Usuario( nombre, email, '', role, google, img, uid );
        localStorage.setItem( 'token', resp.token );
        return true;
      }),
      catchError( error => of(false) )
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

    return this.http.put(`${base_url}/usuarios/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });
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


}
