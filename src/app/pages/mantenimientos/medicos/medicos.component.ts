import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public medicos: Medico[] = [];
  public imgSubs!: Subscription;

  constructor( private medicoService: MedicoService,
               private modalService: ModalImagenService,
               private busquedaService: BusquedasService ) { }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img => {
      this.cargarMedicos();
    });
  }

  cargarMedicos(){
    this.cargando = true;

    this.medicoService.listadoMedicos()
        .subscribe( resp => {
          this.cargando = false;
          this.medicos = resp;
    });
  }

  abrirModal( medico: Medico ){
    this.modalService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar( busqueda: string ){

    if( busqueda.length === 0 ){
      this.cargarMedicos();
      return;
    }

    this.busquedaService.buscar( 'medicos', busqueda )
      .subscribe( resp => this.medicos = resp as Medico[] );
  }

  eliminar( medico: Medico ){

    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      text: `Estas apunto de eliminar el médico ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminar( medico._id ).subscribe(
          () => {
            this.cargarMedicos();
            Swal.fire(
            'medico eliminado',
            `${ medico.nombre } fue eliminado correctamente`,
            'success'
          )});
      }
    });
  }

}
