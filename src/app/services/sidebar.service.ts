import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', path: '/'},
        { titulo: 'ProgressBar', path: 'progress'},
        { titulo: 'Graficas', path: 'grafica1'},
        { titulo: 'Promesas', path: 'promesas'},
        { titulo: 'Rxjs', path: 'rxjs'},
      ]
    }
  ];

  constructor() { }
}
