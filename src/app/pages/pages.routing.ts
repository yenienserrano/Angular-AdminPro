import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { RoleAdminGuard } from '../guard/role-admin.guard';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimiento/medicos/medico.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
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
          { path: 'account-setting', component: AccountSettingComponent, data:{titulo: 'Themas'}},
          { path: 'buscar/:termino', component: BusquedaComponent, data:{titulo: 'Busqueda'}},
          { path: 'grafica1', component: Grafica1Component, data:{titulo: 'Grafica #1'}},
          { path: 'perfil', component: PerfilComponent, data:{titulo: 'Perfil'}},
          { path: 'progress', component: ProgressComponent, data:{titulo: 'ProgressBar'}},
          { path: 'promesas', component: PromesasComponent, data:{titulo: 'Promesas'}},
          { path: 'rxjs', component: RxjsComponent, data:{titulo: 'RxJs'}},

          //Mantenimiento
          { path: 'hospitales', component: HospitalesComponent, data:{titulo: 'Mantenimiento de hospitales'}},
          { path: 'medicos', component: MedicosComponent, data:{titulo: 'Mantenimiento de medicos'}},
          { path: 'medico/:id', component: MedicoComponent, data:{titulo: 'Mantenimiento de medico'}},
          
          //usuario administrador
          { path: 'usuarios', canActivate: [ RoleAdminGuard ], component: UsuariosComponent, data:{titulo: 'Mantenimiento de usuarios'}},
        ]
      },
]

@NgModule({
    declarations: [],
    imports: [ RouterModule.forRoot( routes )],
    exports: [ RouterModule ]
  })
export class PagesRoutingModule { }