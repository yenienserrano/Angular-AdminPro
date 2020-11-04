import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BusquedaService } from 'src/app/services/busqueda.service';

import { Hospital } from 'src/app/models/hospitales.model';
import { Medicos } from 'src/app/models/medicos.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = []
  public medicos: Medicos[] = []
  public hospitales: Hospital[] = []

  constructor( private activatedRoute: ActivatedRoute,
               private busquedaService: BusquedaService) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe( ({ termino }) => this.busquedaGlobal( termino ))

  }

  busquedaGlobal( termino: string ){
    this.busquedaService.BusquedaGlobal( termino )
      .subscribe( (resp: any) => {
        this.hospitales = resp.hospitales
        this.medicos = resp.medicos
        this.usuarios = resp.usuarios
      })
  }


}
