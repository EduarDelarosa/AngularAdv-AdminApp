import { NgIf } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public interval!: Subscription;

  constructor() {

    // this.retornaObservable().pipe(
    //   retry(1)
    // )
    // .subscribe({
    //   next: valor => console.log('Seg',valor),
    //   error: err => console.error('Error',err),
    //   complete: () => console.info('observable completado')
    // })

    this.interval = this.retornaIntervalo().subscribe(console.log);

  }
  ngOnDestroy(): void {
    this.interval.unsubscribe();
  }

  retornaIntervalo(): Observable<number>{

    return interval(500)
            .pipe(
            take(10),
            map( valor => valor + 1),
            filter( valor => ( valor % 2 === 0 ) ? true : false )
            );
  }

  retornaObservable(): Observable<number>{

    return new Observable<number>( observer => {

      let i = -1;
      const intervalo = setInterval( () =>{
        i++;
        observer.next(i);
        if(i === 5){
          clearInterval( intervalo );
          observer.complete();
        }

        if (i === 2) {
          observer.error('i es igual a 2 asi que eeerrrorrr')
        }

      }, 1000)
    });
  }
}
