import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any = [];

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu') || '') || [];
  }

  // menu: any[] = [
  //   {
  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Main', path: '/'},
  //       { titulo: 'ProgressBar', path: 'progress'},
  //       { titulo: 'Graficas', path: 'grafica1'},
  //       { titulo: 'Promesas', path: 'promesas'},
  //       { titulo: 'Rxjs', path: 'rxjs'},
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', path: 'usuarios'},
  //       { titulo: 'Hospitales', path: 'hospitales'},
  //       { titulo: 'Médicos', path: 'medicos'}
  //     ]
  //   }
  // ];

  constructor() { }
}
