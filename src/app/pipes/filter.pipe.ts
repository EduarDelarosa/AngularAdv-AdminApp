import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: any[]): any {
    const resultData = [];
    for(const val of value){
      if( val.nombre.indexOf(args) > -1 ){
        resultData.push(val);
      }
    }
    return resultData;
  }

}
