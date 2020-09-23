import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';

export const routes: Routes = [
    { 
        path: 'dashboard',
        component: PagesComponent,
        children: [
          { path: '', component: DashboardComponent },
          { path: 'progress', component: ProgressComponent },
          { path: 'grafica1', component: Grafica1Component},
        ]
      },
]

@NgModule({
    declarations: [],
    imports: [ RouterModule.forRoot( routes )],
    exports: [ RouterModule ]
  })
export class PagesRoutingModule { }