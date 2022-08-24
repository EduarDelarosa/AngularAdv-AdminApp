import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  public url = base_url + '/hospitales';

  constructor(private http: HttpClient) { }

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

  getHospitales(){
    return this.http.get( this.url, this.headers )
                .pipe(
                  map( ( resp: any ) => resp.hospitales )
                )
  }

  crear( nombre: string ){
    return this.http.post( this.url, { nombre }, this.headers );
  }

  actualizar( _id: any, nombre: string ){
    return this.http.put( `${ this.url }/${ _id }`, { nombre }, this.headers );
  }

  eliminar( _id: string ){
    return this.http.delete( `${ this.url }/${ _id }`, this.headers );
  }
}
