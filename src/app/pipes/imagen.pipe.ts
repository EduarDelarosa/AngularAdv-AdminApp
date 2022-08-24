import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: any, tipo:'usuarios'|'medicos'|'hospitales'): unknown {
    if( !img ) {
      return `${ base_url }/upload/hospitales/no-image`;
    } else if( img && img.includes('https') ) {
      return img;
    }else if ( img ) {
      return `${ base_url }/upload/${ tipo }/${ img }`;
    }else{
      return `${ base_url }/upload/hospitales/no-image`;
    };
  }

}
