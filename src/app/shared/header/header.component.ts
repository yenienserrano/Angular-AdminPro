import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: Usuario

  constructor( private usuarioService: UsuariosService,
               private router: Router ) {
    this.usuario = usuarioService.usuario
  }

  logout(){
    this.usuarioService.logout()
  }

  buscar( termino ){
    this.router.navigateByUrl(`/dashboard/buscar/${ termino }`)
  }

}
