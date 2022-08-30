import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
      'x-token': this.token
    }
  }
  }

  private transformarUsuario( resultados: any[] ): Usuario[] {

    return resultados.map(
      user => new Usuario( user.nombre, user.email, '', user.role, user.google, user.img, user.uid)
    );

  }

  private transformarMedicos( resultados: any[] ): Medico[] {
    return resultados;
  }

  buscar(tipo: 'usuarios'| 'hospitales' | 'medicos',
         busqueda: string){

    const url = `${ base_url }/todo/coleccion/${ tipo }/${ busqueda }`;
    return this.http.get<any[]>( url, this.headers )
                  .pipe(
                    map( ( resp: any ) => {
                      switch (tipo) {

                        case 'usuarios':
                          return this.transformarUsuario( resp.resultado );

                        case 'medicos':
                          return this.transformarMedicos( resp.resultado )

                        default:
                          return [];
                      }
                    } )
                  );
  }

  buscarAll( termino: string ){
    // http://localhost:3000/api/todo/e
    const url = `${ base_url }/todo/${ termino }`;
    return this.http.get(url, this.headers)
  }


}
