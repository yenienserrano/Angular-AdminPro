import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';


@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styles: [
  ]
})
export class ImageModalComponent implements OnInit {

  public imagenSubir: File
  public imgTemp    : any = ""

  constructor( public modalImagenService: ModalImagenService,
               public fileService: FileUploadService ) { }

  ngOnInit(): void {
  }

  ocultar(){
    this.imgTemp = null
    this.modalImagenService.ocultarModal()
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
    const id = this.modalImagenService.id
    const tipo = this.modalImagenService.tipo

    this.fileService.actualizarImagen( this.imagenSubir, tipo, id)
                      .then( img => {
                        Swal.fire( 'Guardada', 'La imagen se actualizo correctamente', 'success' )
                        this.modalImagenService.nuevaImagen.emit( img )
                        this.ocultar()
                      }).catch(err => {
                        console.log(err)
                        Swal.fire( 'Error', 'La imagen no se actualizo', 'error' )
                      })
  }
}
