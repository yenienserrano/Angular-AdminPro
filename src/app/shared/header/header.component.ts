import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {


  constructor( private usuarioService: UsuariosService ) {}

  logout(){
    this.usuarioService.logout()
  }

}
