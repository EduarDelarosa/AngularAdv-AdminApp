import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  ngOnInit(): void {
    this.btnColor = `btn ${this.btnColor}`;
  }

  // @Input('valor') progreso: number = 25; si queremos renombrar la variable se hace de esta forma, la variable declarada dentro del input, es la que se debe pasar al componente
  @Input('valor') progreso: number = 25;
  @Input() btnColor: string = 'btn-primary';

  @Output() valorEmitido: EventEmitter<number> = new EventEmitter();


  // get getPorcentaje(){
  //   return `${this.progreso}%`
  // }


  cambiarPorcentaje(value: number){
    if (this.progreso > 100 && value > 0){
      this.valorEmitido.emit(100);
      this.progreso = 100;
    }

    if (this.progreso < 0 && value < 0){
      this.valorEmitido.emit(0);
      this.progreso = 0;
    }

    this.progreso = this.progreso + value;
    this.valorEmitido.emit(this.progreso);
  }

  onChange(valor: number) {
    if(valor >= 100){
      this.progreso = 100;
    }else if(valor < 0){
      this.progreso = 0;
    }else{
      this.progreso = valor;
    }
    this.valorEmitido.emit(this.progreso)
  }

}
