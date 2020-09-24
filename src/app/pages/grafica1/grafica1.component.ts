import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  labels1: string[] = [ 'Ventas exitosas', 'Pendientes', 'Reclamadas']
  labels2: string[] = [ 'Disponible', 'Pendientes', 'No disponible']
  labels3: string[] = [ 'Compras exitosas', 'Pendientes', 'Faltantes']
  labels4: string[] = [ 'Entregadas', 'Pendientes de entrega', 'Devueltas']

  title1: string = "Ventas"
  title2: string = "Stock"
  title3: string = "Compras"
  title4: string = "Distribucion"

  valorDona1 = [
    [ 14, 3, 4 ]
  ]  
  valorDona2 = [
    [ 50, 30, 10 ]
  ]  
  valorDona3 = [
    [ 1, 1, 10 ]
  ]
  valorDona4 = [
    [ 9, 4, 1 ]
  ]
}
