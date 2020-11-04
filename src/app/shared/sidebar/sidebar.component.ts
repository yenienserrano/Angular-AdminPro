import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public itemMenu
  public usuario: Usuario

  constructor( public sidebarService: SidebarService,
               private usuarioService: UsuariosService ) {
    this.itemMenu = sidebarService.menu
    this.usuario  = usuarioService.usuario
   }



  ngOnInit(): void {
  }

}
