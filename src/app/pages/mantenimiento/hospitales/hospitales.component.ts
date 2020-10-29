import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospitales.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = []
  public hospitalesTemp: Hospital[] = []
  public cargando: boolean = true
  public imgSubs: Subscription

  constructor( private hospitalesService: HospitalesService,
               private modalImagenService: ModalImagenService,
               private buscarService: BusquedaService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarHospitales()

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(300)
      )
      .subscribe( img => this.cargarHospitales())
  }

  cargarHospitales(){
    this.cargando = true
    
    this.hospitalesService.cargarHospitales()
      .subscribe(resp => {
        this.cargando = false
        this.hospitales = resp
        this.hospitalesTemp = resp
    })
  }

  actualizarHospital( hospital ){
    this.hospitalesService.actualizarHospital( hospital._id, hospital.nombre )
      .subscribe( resp => {
        Swal.fire('Hospital actualizado', hospital.nombre, 'success')
      })
  }
  
  borrarHospital( hospital: Hospital ){
    Swal.fire({title: '¿Eliminar usuario?',
      text: `Seguro quieres eliminar a ${ hospital.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si eliminar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.hospitalesService.eliminarHospital( hospital._id )
          .subscribe( resp => {
            Swal.fire(
              'Eliminado',
              `El usuario ${ hospital.nombre } fue eliminado`,
              'success'
            )

            this.cargarHospitales()
          })

      }
    })
  }

  async crearHospital(){
    const  { value = "" } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Escribe el nombre del nuevo hospital',
      input: 'text',
      inputLabel: 'Nombre del hospital',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    })

    if( value.trim().length > 0){
      this.hospitalesService.crearHospital( value )
        .subscribe( (resp: any) => {
          Swal.fire( 'Hospital creado', 'El hospital se creo correctamente', 'success')
          this.hospitales.push( resp.hospitalDB )
        })
    }
    
  }

  verModal( hospital ){
    this.modalImagenService.mostrarModal( "hospitales", hospital._id, hospital.img )
  }

  buscar( texto: string ){
    if( texto.length === 0 ){
      return this.hospitales = this.hospitalesTemp
    }
    
    this.buscarService.buscar( "hospitales", texto )
      .subscribe( (resp: Hospital[]) => {

        this.hospitales = resp
      })
  }
}
