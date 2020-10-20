import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FormRegister } from '../interfaces/form-register.interface';
import { login } from '../interfaces/login.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url
declare const gapi: any

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public auth2: any
  public usuario: Usuario

  constructor( private http: HttpClient,
               private ngZone: NgZone,
               private router: Router){ 
  this.googleInit()
}
get token(){
    return localStorage.getItem('token') || ''    
}

get uid(){
  return this.usuario._id
}

googleInit() {

return new Promise( resolve => {
  gapi.load('auth2', () => {
    this.auth2 = gapi.auth2.init({
      client_id: '956032514114-uaso2916f157nbg7rh5a60eu2e13e6rp.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
    });

    resolve();
  });
})

}

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });

  }

  validarToken(){

    return this.http.get(`${base_url}/auth/renew`, {
      headers:{
        'x-token': this.token
      }
    })
    .pipe(
      map( (resp: any) => {
        const { email, google, nombre, role, _id, img } = resp.usuario

        this.usuario = new Usuario( email, nombre, "", img, google, role, _id )
        localStorage.setItem('token', resp.token)
        return true
      }),
      catchError( error => of(false))
    )
  }

  crearUsuario( formData: FormRegister ){
    return this.http.post(`${base_url}/usuarios`, formData)
                      .pipe(
                        tap( (resp: any) => {
                          localStorage.setItem('token', resp.token)
                        })
                      )
  }

  actualizarPerfil( formData: {email: string, nombre: string, role: string}){

    formData = {
      ...formData,
      role: this.usuario.role
    }

    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, formData, {
      headers:{
        'x-token': this.token
      }
    })
  }

  login( formData: login ){
    return this.http.post(`${base_url}/auth`, formData)
                      .pipe(
                        tap( (resp: any) => {
                          localStorage.setItem('token', resp.token)
                        })
                      )
  }

  loginGoogle( token ){
    return this.http.post(`${base_url}/auth/google`, { token })
                      .pipe(
                        tap( (resp: any) => {
                          localStorage.setItem('token', resp.token)
                        })
                      )
  }
}
