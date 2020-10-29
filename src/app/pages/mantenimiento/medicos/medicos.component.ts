import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medicos } from 'src/app/models/medicos.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { MedicoComponent } from './medico.component';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medicos[] = []
  public medicosTemp: Medicos[] = []
  public cargando: boolean = true
  public imgSubs: Subscription

  constructor( private medicosService: MedicosService,
               private modalImagenService: ModalImagenService,
               private buscarService: BusquedaService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarMedicos()

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(300)
      )
      .subscribe( img => this.cargarMedicos())
  }

  cargarMedicos(){
    this.cargando = true
    this.medicosService.cargarMedicos()
      .subscribe( (resp: any) => {
        this.cargando = false
        this.medicos = resp
        this.medicosTemp = resp
      })
  }

  verModal( medico ){
    this.modalImagenService.mostrarModal( "medicos", medico._id, medico.img )
  }

  buscar( texto: string ){
    if( texto.length === 0 ){
      return this.medicos = this.medicosTemp
    }
    
    this.buscarService.buscar( "medicos", texto )
      .subscribe( (resp: Medicos[]) => {

        this.medicos = resp
      })
  }

  borrarMedico( medico: Medicos ){
    Swal.fire({title: '¿Eliminar usuario?',
      text: `Seguro quieres eliminar a ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si eliminar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.medicosService.eliminarMedico( medico._id )
          .subscribe( resp => {
            Swal.fire(
              'Eliminado',
              `El usuario ${ medico.nombre } fue eliminado`,
              'success'
            )

            this.cargarMedicos()
          })

      }
    })
  }

}
