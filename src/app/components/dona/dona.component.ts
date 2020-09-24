import { Component, Input } from '@angular/core';

import { MultiDataSet, Label, Colors } from 'ng2-charts';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {
  
 @Input() title = 'Sin titulo'

 // Doughnut
 @Input('labels') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
 @Input('valorDona') doughnutChartData: MultiDataSet = [ 
  [ 50, 100, 200 ]
];
 public colors: Colors[] = [
   {backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ]}
 ]  

}
