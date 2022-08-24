import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../guards/auth.guard";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { PagesComponent } from "./pages.component";
import { AcountSettingsComponent } from "./acount-settings/acount-settings.component";
import { ProgressComponent } from "./progress/progress.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { UsuariosComponent } from "./mantenimientos/usuarios/usuarios.component";
import { HospitalesComponent } from "./mantenimientos/hospitales/hospitales.component";
import { MedicosComponent } from "./mantenimientos/medicos/medicos.component";
import { MedicoComponent } from "./mantenimientos/medicos/medico.component";


const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    canActivate:[ AuthGuard ],
    children: [
     { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
     { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
     { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Graficas #1' } },
     { path: 'account', component: AcountSettingsComponent, data: { titulo: 'Settings' } },
     { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
     { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
     { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil' } },

     //Mantenimientos
     { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' } },
     { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales' } },
     { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos' } },
     { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Medico' } },
    ]
 },
]


@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})

export class PagesRoutingModule {}
