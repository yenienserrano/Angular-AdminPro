import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor( private http: HttpClient ) { }

  get token(){
    return localStorage.getItem('token') || ''    
}


get headers(){
  return {
    headers:{
      'x-token': this.token
    }
  }
}

private transformarUsuarios( respuesta: any[] ): Usuario[] {

  return respuesta.map( user => new Usuario(
    user.email, user.nombre, "", user.img, user.google, user.role, user._id
  ))
}

  buscar( tipo: "usuarios"|"medicos"|"hospitales", texto: string ){
    const url = `${ base_url}/todo/coleccion/${ tipo }/${ texto }`

    return this.http.get( url, this.headers ).pipe(
      map( (resp: any) => {
        switch (tipo) {
          case "usuarios":
            return this.transformarUsuarios(resp.data)
            break;
        
          default:
            return []
        }
      } )
    )
  }
}
