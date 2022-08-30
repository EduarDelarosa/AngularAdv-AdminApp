import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public termino: string = '';
  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(private activatedRouter: ActivatedRoute,
              private busquedaService: BusquedasService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe( ({termino}) => this.busqueda( termino ))
  }

  busqueda( termino: string ){

    this.busquedaService.buscarAll( termino )
        .subscribe((resp: any) => {
          this.usuarios = resp.usuarios;
          this.medicos = resp.medicos;
          this.hospitales = resp.hospitales;
        });
  }


  abrirMedico( medico: Medico ){
    this.router.navigateByUrl(`/dashboard/medico/${ medico._id }`);
  }

}
