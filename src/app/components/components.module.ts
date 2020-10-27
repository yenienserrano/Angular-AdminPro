import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';
import { ImageModalComponent } from './image-modal/image-modal.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ImageModalComponent
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ImageModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
