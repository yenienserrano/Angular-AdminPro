import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FormRegister } from '../interfaces/form-register.interface';
import { login } from '../interfaces/login.interface';

const base_url = environment.base_url
declare const gapi: any

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public auth2: any

  constructor( private http: HttpClient,
               private ngZone: NgZone,
               private router: Router){ 
  this.googleInit()
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
    const token = localStorage.getItem('token') || ''

    return this.http.get(`${base_url}/auth/renew`, {
      headers:{
        'x-token': token
      }
    })
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token)
      }),
      map( resp => true),
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
