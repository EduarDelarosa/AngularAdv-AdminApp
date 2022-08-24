import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[]  = [];
  public cargando: boolean = true;
  public imgSubs!: Subscription;
  public filterData: any = '';

  constructor(
              private hospitalService: HospitalService,
              private modalService: ModalImagenService
              ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe( () => {
      this.cargarHospitales();
    });
  }

  cargarHospitales() {
    this.cargando = true;

    this.hospitalService.getHospitales()
        .subscribe(hospitales => {
          this.hospitales = hospitales;
          this.cargando = false;
    })
  }

  actualizar( hospital: Hospital ){
    this.hospitalService.actualizar( hospital._id, hospital.nombre ).subscribe( () => {
      Swal.fire('Actualizado', hospital.nombre, 'success');
    });
  }

  eliminar( hospital: Hospital ){

    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      text: `Estas apunto de eliminar el hospital ${ hospital.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.eliminar( hospital._id ).subscribe(
          () => {
            this.cargarHospitales();
            Swal.fire(
            'hospital eliminado',
            `${ hospital.nombre } fue eliminado correctamente`,
            'success'
          )});
      }
    });
  }

  async abrirSweetModal(){

    const { value } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputLabel: 'Nombre del hospital',
      inputPlaceholder: 'Ej: Hospital central...',
      showCancelButton: true
    });

    if( value === undefined ){
      return;
    } else if( value!.trim().length > 0 ){
      this.hospitalService.crear( value )
          .subscribe( ( resp: any ) => {
            this.cargarHospitales();
            Swal.fire('Creado', 'Hospital creado exitosamente!' ,'success');
          });
    }

  }

  abrirModal( hospital: Hospital ){
    this.modalService.abrirModal('hospitales', hospital._id, hospital.img);
  }

}
