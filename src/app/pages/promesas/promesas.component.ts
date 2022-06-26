import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // const promesa = new Promise( (resolve, reject) => {
    //   if( false ){
    //     resolve('Hola desde una promesa');
    //   }else {
    //     reject( 'Error en la promesa' );
    //   }

    // });

    // promesa.then( (res) =>{
    //   console.log(`Hola desde el then de la promesa, el mensaje dentro de la promesa es: ${ res }`);
    // })
    // .catch( (err) => console.log( 'error desde el catch', err) );

    // console.log('Hola desde fuera de la promesa');

    this.getUsuarios();
    this.getUsuarios2().then( ( data ) => {
      console.log(data);
    })

  }

  getUsuarios(){
    fetch('https://reqres.in/api/users')
      .then( (res) => {
        res.json().then( body => { console.log(body) })
      })
  }

  //Mejor forma de escribir la promesa
  getUsuarios2(){

    const promesa = new Promise( ( resolve ) => {
      fetch('https://reqres.in/api/users')
        .then( (res) => res.json())
        .then( (body) => resolve(body.data) );
    });

    return promesa;

  }
}
