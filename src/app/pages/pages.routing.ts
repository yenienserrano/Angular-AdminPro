import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { AccountSettingComponent } from './account-setting/account-setting.component';


import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

export const routes: Routes = [
    { 
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: DashboardComponent, data:{titulo: 'Dashboard'}},
          { path: 'progress', component: ProgressComponent, data:{titulo: 'ProgressBar'}},
          { path: 'grafica1', component: Grafica1Component, data:{titulo: 'Grafica #1'}},
          { path: 'account-setting', component: AccountSettingComponent, data:{titulo: 'Themas'}},
          { path: 'promesas', component: PromesasComponent, data:{titulo: 'Promesas'}},
          { path: 'rxjs', component: RxjsComponent, data:{titulo: 'RxJs'}},
        ]
      },
]

@NgModule({
    declarations: [],
    imports: [ RouterModule.forRoot( routes )],
    exports: [ RouterModule ]
  })
export class PagesRoutingModule { }