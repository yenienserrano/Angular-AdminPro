import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  public perfilForm : FormGroup
  public usuario    : Usuario
  public imagenSubir: File
  public imgTemp    : any = ""

  constructor( private fb            : FormBuilder,
               private usuarioService: UsuariosService,
               private fileService    : FileUploadService) {
  this.usuario = usuarioService.usuario
}

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required],
      email:  [ this.usuario.email, [ Validators.required, Validators.email ]],
    })
  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil( this.perfilForm.value ).subscribe( resp => {
      const { nombre, email } = this.perfilForm.value
      
      this.usuario.nombre = nombre
      this.usuario.email  = email

      Swal.fire( 'Guardados', 'Los datos se actualizaron correctamente', 'success' )
    },err => Swal.fire( 'Error', err.error.msg, "error" ))
  }

  cambiarImagen( file: File ){
    this.imagenSubir = file

    if( !file ) return this.imgTemp = null

    const reader = new FileReader()
    reader.readAsDataURL( file )

    reader.onloadend = () => {
      this.imgTemp = reader.result
    }
  }

  actualizarImagen(){
    this.fileService.actualizarImagen( this.imagenSubir, 'usuarios', this.usuario._id)
                      .then( img => {
                        this.usuario.img = img
                        Swal.fire( 'Guardada', 'La imagen se actualizo correctamente', 'success' )
                        
                      })
  }

}
