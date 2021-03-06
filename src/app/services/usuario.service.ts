import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, map, catchError } from 'rxjs/operators';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) { }


  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
     }).pipe(
      tap( ( resp:any ) => {
        localStorage.setItem( 'token', resp.token );
      }),
      map( resp => true ),
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

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }


}
