import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospitales.model';
import { Medicos } from '../models/medicos.model';
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
private transformarHospital( respuesta: any[] ): Hospital[] {

  return respuesta
}

private transformarMedicos( respuesta: any[] ): Medicos[] {

  return respuesta
}

  BusquedaGlobal( termino: string ) {
    const url = `${ base_url}/todo/${ termino }`

    return this.http.get( url, this.headers )
  }

  buscar( tipo: "usuarios"|"medicos"|"hospitales", texto: string ){
    const url = `${ base_url}/todo/coleccion/${ tipo }/${ texto }`

    return this.http.get( url, this.headers ).pipe(
      map( (resp: any) => {
        switch (tipo) {
          case "usuarios":
            return this.transformarUsuarios(resp.data)
            
          case "hospitales":
            return this.transformarHospital(resp.data)

          case "medicos":
            return this.transformarMedicos(resp.data)

          default:
            return []
        }
      } )
    )
  }
}
