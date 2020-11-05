import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { PagesComponent } from './pages.component';




export const routes: Routes = [
    { 
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule ) 
      },
]

@NgModule({
    declarations: [],
    imports: [ RouterModule.forRoot( routes )],
    exports: [ RouterModule ],
  })
export class PagesRoutingModule { }