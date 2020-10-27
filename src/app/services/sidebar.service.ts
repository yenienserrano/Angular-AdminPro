import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: "Dashboard",
      icono: "mdi mdi-gauge",
      submenu:[
        {titulo: 'Main', url:''},
        {titulo: 'Graficas', url:'grafica1'},
        {titulo: 'rxjs', url:'rxjs'},
        {titulo: 'Promesas', url:'promesas'},
        {titulo: 'ProgressBar', url:'progress'},
      ]
    },
    {
      titulo: "Mantenimiento",
      icono: "mdi mdi-folder-lock-open",
      submenu:[
        {titulo: 'Usuarios', url:'usuarios'},
        {titulo: 'Hospitales', url:'hospitales'},
        {titulo: 'Medicos', url:'medicos'}
      ]
    }
  ]


  constructor() { }
}
