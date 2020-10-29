import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Medicos } from '../models/medicos.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  
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

  cargarMedicos(){
    const url = `${ base_url }/medicos`

    return this.http.get( url, this.headers )
      .pipe(
        map( (resp: {ok:true, medicosDB:Medicos[]}) => resp.medicosDB)
      )
  }

  cargarMedico( id ){
    const url = `${ base_url }/medicos/${ id }`

    return this.http.get( url, this.headers )
      .pipe(
        map( (resp: {ok:true, medico:Medicos}) => resp.medico)
      )
  }

  crearMedico( medico: { nombre, hospital } ){
    const url = `${ base_url }/medicos`

    return this.http.post( url, medico, this.headers )
  }

  actualizarMedico( medico: Medicos ){
    const url = `${ base_url }/medicos/${ medico._id }`

    return this.http.put( url, medico, this.headers )
  }

  eliminarMedico( _id:string ){
    const url = `${ base_url }/medicos/${ _id }`

    return this.http.delete( url, this.headers )
}
}
