import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  actualizarFoto( archivo: File, tipo: 'usuarios'|'medicos'|'hospitales', id: any ){

      const url = `${ base_url }/upload/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      return this.http.put(url, formData, {
        headers: {
          'x-token': localStorage.getItem('token') || ''
        }
      });

  }
}
