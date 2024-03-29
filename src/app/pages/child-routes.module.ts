import { NgModule } from '@angular/core';

import { DashboardComponent } from "./dashboard/dashboard.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { AcountSettingsComponent } from "./acount-settings/acount-settings.component";
import { ProgressComponent } from "./progress/progress.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { UsuariosComponent } from "./mantenimientos/usuarios/usuarios.component";
import { HospitalesComponent } from "./mantenimientos/hospitales/hospitales.component";
import { MedicosComponent } from "./mantenimientos/medicos/medicos.component";
import { MedicoComponent } from "./mantenimientos/medicos/medico.component";
import { BusquedaComponent } from "./busqueda/busqueda.component";
import { AdminGuard } from "../guards/admin.guard";
import { RouterModule, Routes } from '@angular/router';


const childRoute: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Graficas #1' } },
  { path: 'account', component: AcountSettingsComponent, data: { titulo: 'Settings' } },
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil' } },
  { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busqueda' } },

  //Mantenimientos
  { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales' } },
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos' } },
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Medico' } },

  //Rutas de admin
  { path: 'usuarios', canActivate: [ AdminGuard ] , component: UsuariosComponent, data: { titulo: 'Usuarios' } },
]



@NgModule({
  imports: [ RouterModule.forChild(childRoute)],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
