import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  public title: string = 'Sin Titulo';

  public items: string[] = [ 'item 1', 'items 2', 'item 3' ];
  public data1  = {
    datasets: [
      { data: [ 10, 10, 80 ] }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
