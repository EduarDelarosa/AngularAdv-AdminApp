import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  public url = `${ base_url }/medicos`;

  constructor(private http: HttpClient) { }

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

  listadoMedicos(){
    return this.http.get( this.url, this.headers )
                .pipe(
                  map(( resp: any ) => resp.medicos)
                )
  }

  getById( id: string ){
    return this.http.get<{ ok:boolean, medicos: Medico }>( `${this.url}/${ id }`, this.headers )
                .pipe(
                  map(( resp: { ok:boolean, medicos: Medico } ) => resp.medicos )
                )
  }

  crear( medico: { nombre: string, hospital: string } ){
    return this.http.post( this.url, medico, this.headers );
  }

  actualizar( medico: Medico ){
    return this.http.put( `${ this.url }/${ medico._id }`, medico, this.headers );
  }

  eliminar( _id: string ){
    return this.http.delete( `${ this.url }/${ _id }`, this.headers );
  }


}
