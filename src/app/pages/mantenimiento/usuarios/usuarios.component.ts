import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { BusquedaService } from 'src/app/services/busqueda.service';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number
  public usuarios: Usuario[]
  public usuariosTemp: Usuario[]
  public desde: number = 0
  public cargando: boolean = true
  public uidLogeado: string
  public imgSubs: Subscription


  constructor( private usuarioService: UsuariosService,
               private buscarService : BusquedaService,
               private modalImagenService: ModalImagenService) { 
                this.uidLogeado = usuarioService.uid
               }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarUsuarios()

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(300)
      )
      .subscribe( img => this.cargarUsuarios())
  }

  cargarUsuarios(){
    this.cargando = true

    this.usuarioService.cargarUsuarios( this.desde )
          .subscribe(({ total, usuarios}) => {
            this.totalUsuarios = total
            this.usuarios = usuarios
            this.usuariosTemp = usuarios
            this.cargando = false
          })
  }

  cambiarPagina( valor: number ){
    this.desde += valor

    if( this.desde < 0){
      this.desde = 0
    } else if( this.desde > this.totalUsuarios ){
      this.desde -= valor
    }

    this.cargarUsuarios()
  }

  buscar( texto: string ){
    if( texto.length === 0 ){
      return this.usuarios = this.usuariosTemp
    }
    
    this.buscarService.buscar( "usuarios", texto )
      .subscribe( (resp: Usuario[]) => {

        this.usuarios = resp
      })
  }
  
  eliminarUsuario( usuario: Usuario ){


    if( usuario._id === this.usuarioService.uid ){
      return Swal.fire('Error', 'No te puedes borrar a ti mismo', 'error')
    }

    Swal.fire({title: '¿Eliminar usuario?',
      text: `Seguro quieres eliminar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si eliminar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.eliminarUsuario( usuario )
          .subscribe( resp => {
            Swal.fire(
              'Eliminado',
              `El usuario ${ usuario.nombre } fue eliminado`,
              'success'
            )

            this.cargarUsuarios()
          })

      }
    })
  }

  guardarRole( usuario: Usuario ){
    this.usuarioService.guardarRole( usuario ).subscribe( resp => {
      console.log(resp)
    })
  }

  verModal( usuario ){
    this.modalImagenService.mostrarModal( "usuarios", usuario._id, usuario.img )
  }
}
