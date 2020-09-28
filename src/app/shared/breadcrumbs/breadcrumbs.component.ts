import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  titulo
  tituloSub$: Subscription

  constructor( private router: Router) { 
    this.tituloSub$ = this.getBreadcrunbs().subscribe( ({ titulo }) => {
      this.titulo = titulo;
      document.title = `Admin Pro - ${ titulo }`
    })
  }
  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe()
  }

  getBreadcrunbs(){
    return this.router.events
            .pipe(
              filter( event => event instanceof ActivationEnd ),
              filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
              map( (event: ActivationEnd) => event.snapshot.data ),
            )
      


  }

}
