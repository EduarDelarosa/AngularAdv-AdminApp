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
export class BreadcrumbsComponent implements OnDestroy {

  public title!: string;
  public titleUnsubscribe$!: Subscription;

  constructor( private router: Router ) {
    this.getTitulos();
  }


  ngOnDestroy(): void {
    this.titleUnsubscribe$.unsubscribe();
  }


  getTitulos(){

    this.titleUnsubscribe$ = this.router.events
      .pipe(
        filter( ( event: any ) => event instanceof ActivationEnd ),
        filter( ( event: ActivationEnd ) => event.snapshot.firstChild === null ),
        map( ( event: ActivationEnd ) => event.snapshot.data ),
       )
       .subscribe( ({ titulo }) => {
         this.title = titulo;
         document.title = `AdminApp - ${this.title}`;
       });
  }

}
