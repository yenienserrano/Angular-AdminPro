import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospitales.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

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

cargarHospitales(){
  const url = `${ base_url }/hospitales`

  return this.http.get( url, this.headers )
    .pipe(
      map( (resp: {ok:true, hospitales:Hospital[]}) => resp.hospitales)
    )
}
crearHospital( nombre: string ){
  const url = `${ base_url }/hospitales`

  return this.http.post( url, { nombre }, this.headers )
}
actualizarHospital( _id:string, nombre: string ){
  const url = `${ base_url }/hospitales/${ _id }`

  return this.http.put( url, { nombre }, this.headers )
}
eliminarHospital( _id:string ){
  const url = `${ base_url }/hospitales/${ _id }`

  return this.http.delete( url, this.headers )
}
}
