import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class RoleAdminGuard implements CanActivate {

  constructor( private usuarioService: UsuariosService,
               private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if( this.usuarioService.role === 'ADMIN_ROLE' ){
      return true
    } else {
      this.router.navigateByUrl('/dashboard')
      return false
    }
  }
  
}
