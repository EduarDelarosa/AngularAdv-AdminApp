import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input('titulo') title: string = 'Sin Titulo';
  @Input() data = [10, 20, 70]
  // Doughnut
  @Input('labels') doughnutChartLabels: string[] = [ 'Download Sales 1', 'In-Store Sales 1', 'Mail-Order Sales 1' ];
  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ],
        backgroundColor: ['#6857E6','#009FEE','#F02059'],
        hoverBackgroundColor: ['#22D5D7','#D95373','#50D981'],
        hoverBorderColor:['#FFFFFF','#FFFFFF','#FFFFFF']
      },

    ]
  };

  ngOnChanges(changes: SimpleChanges){
    this.doughnutChartData={

      labels: this.doughnutChartLabels,
      datasets:[{ data: this.data, backgroundColor:['#6857E6','#009FEE','#F02059']}]

    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
