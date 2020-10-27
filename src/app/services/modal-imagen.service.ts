import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  public modal: boolean = true
  public tipo: "medicos" | "usuarios" | "hospitales"
  public id: string
  public img: string

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  mostrarModal(
    tipo: "usuarios"|"medicos"|"hospitales",
    id: string,
    img: string = "no-image"
  ){
    this.modal = false
    this.tipo = tipo
    this.id = id

    if( img.includes('http')){
      this.img = img
    } else {
      this.img = `${ base_url }/upload/${ tipo }/${ img  }`
    }
  }

  ocultarModal(){
    this.modal = true
  }
}
