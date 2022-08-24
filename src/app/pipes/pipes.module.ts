import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { FilterPipe } from './filter.pipe';



@NgModule({
  declarations: [ ImagenPipe, FilterPipe ],
  exports: [ ImagenPipe, FilterPipe ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
