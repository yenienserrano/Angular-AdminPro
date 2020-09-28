import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  intervalSubs : Subscription;

  constructor() { 
    
     
    /* this.retornaObserbable().pipe(
      retry()
    ).subscribe(
      valor => console.log( 'Sub:', valor ),
      err => console.warn( 'El valor', err ,'da error' ),
      () => console.info( 'Se completo' )
    )  */

    this.intervalSubs = this.retornaIntervalo().subscribe( console.log )
  }  
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe()
  }


  retornaIntervalo(): Observable<number> {
    return interval( 500 )
            .pipe(
              take(10),
              map( valor => valor + 1 ),
              filter( valor => (valor % 2 === 0) ? true : false )
            )
  }

  retornaObserbable(): Observable<number> {
    let i = -1      
    
    return new Observable<number>  ( observer => {


      const intervalo = setInterval( () => {
        
        i++;

        observer.next(i)

        if( i === 2 ) {
          observer.error( '2' )
        }

        if( i === 4 ){
          clearInterval( intervalo )
          observer.complete()
        }

      }, 1000)
    });  
  }
  
}
