import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado!: Medico;
  public hospitalSeleccionado!: any;

  constructor( private fb: FormBuilder,
               private hospitalService: HospitalService,
               private medicoService: MedicoService,
               private router: Router,
               private activeRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activeRoute.params.subscribe( ({ id }) => {
      this.cargarMedico( id );
    })

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
        .subscribe( hospitalId => {
          this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId )
        });
  }

  cargarMedico( id: string ){

    if(id === 'nuevo') return;

    this.medicoService.getById( id )
    .pipe(
      delay(100)
    )
    .subscribe( medico => {
      if(!medico){
        this.router.navigateByUrl(`/dashboard/medicos`);
        return;
      }
      const { nombre, hospital} = medico;
      this.medicoSeleccionado = medico;
      this.medicoForm.setValue({ nombre, hospital: hospital?._id});
    });
  }

  cargarHospitales(){
    this.hospitalService.getHospitales()
        .subscribe( (hospitales: Hospital[]) => {
          this.hospitales = hospitales;
        });
  }

  guardarMedico(){
    console.log(this.medicoForm.value);

    if(this.medicoSeleccionado){

      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.actualizar( data ).subscribe( resp => {
        Swal.fire('Correcto','Medico Actualizado correctamente','success');
      });

    }else{

      this.medicoService.crear( this.medicoForm.value )
          .subscribe( (resp: any) => {
            Swal.fire('Correcto','Medico creado correctamente','success');
            this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`);
          });
    }

  }

}
