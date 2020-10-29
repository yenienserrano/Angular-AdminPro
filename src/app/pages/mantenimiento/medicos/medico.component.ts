import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospitales.model';
import { Medicos } from 'src/app/models/medicos.model';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit,OnDestroy {
  public hospitales: Hospital[] = []
  public hospitalSeleccionado: Hospital
  public medicoSeleccionado: Medicos
  public medicoForm: FormGroup
  public imgSubs: Subscription
  
  constructor( private fb: FormBuilder,
               private hospitalService: HospitalesService,
               private medicosService: MedicosService,
               private router: Router,
               private activateRoute: ActivatedRoute,
               private modalImagenService: ModalImagenService ) {
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }
  
  ngOnInit(): void {
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(300)
      )
      .subscribe( img => {
        this.activateRoute.params
      .subscribe( ({ id }) => {
        this.cargarMedico(id)
      })   
      })

     this.activateRoute.params
      .subscribe( ({ id }) => {
        this.cargarMedico(id)
      })

    this.cargarHospitales()

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    })

    this.medicoForm.get('hospital').valueChanges
      .subscribe( hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId )
      })
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
      .subscribe( (hospitales: Hospital[]) => {
        this.hospitales = hospitales
      })
  }

  cargarMedico( id ){
    if( id === "nuevo"){
      return
    }

    this.medicosService.cargarMedico( id )
      .pipe(
        delay(100)
      )
      .subscribe( medico => {

        if( !medico ){
          return this.router.navigateByUrl(`/dashboard/medicos`)
        }

        const {nombre, hospital:{_id}} = medico
        this.medicoSeleccionado = medico
        this.medicoForm.setValue({ nombre, hospital: _id})
      })
  }

  guardarCambios(){
    const { nombre } = this.medicoForm.value

    if( this.medicoSeleccionado ){
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicosService.actualizarMedico( data )
        .subscribe( resp => {
          Swal.fire('Medico actualizado', `El medico ${ nombre } fue actualizado correctamente`, 'success') 
        })
    } else {
      this.medicosService.crearMedico( this.medicoForm.value )
        .subscribe( (resp: any) => {
          Swal.fire('Medico creado', `El medico ${ nombre } fue creado correctamente`, 'success')
          this.router.navigateByUrl(`/dashboard/medico/${ resp.medicoDB._id }`)
        })
    }

  }

  verModal( medico ){
    this.modalImagenService.mostrarModal( "medicos", medico._id, medico.img )
  }

}
