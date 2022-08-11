import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit, OnDestroy{

  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public totalUsuarios: number = 0;
  public usuariosDesde: number = 0;
  public cargando: boolean = true;
  public imgSubs!: Subscription;

  constructor(private usuarioService: UsuarioService,
              private busquedaService: BusquedasService,
              private modalService: ModalImagenService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.modalService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img => {
      this.cargarUsuarios();
    });

  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios( this.usuariosDesde )
        .subscribe( ({ total, usuarios }) => {
          this.totalUsuarios = total;
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;

          this.cargando = false;
    });
  }

  paginaUsuarios( valor: number ){
    this.usuariosDesde += valor;

    if( this.usuariosDesde < 0 ){
      this.usuariosDesde = 0;
    }else if( this.usuariosDesde > this.totalUsuarios ){
      this.usuariosDesde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar( busqueda: string ){

    if( busqueda.length === 0 ){
      this.usuarios = this.usuariosTemp;
      return;
    }

    this.busquedaService.buscar( 'usuarios', busqueda )
      .subscribe( resp => this.usuarios = resp );
  }

  eliminarUsuario( usuario : Usuario) {

    if( usuario.uid === this.usuarioService.uid ){
      Swal.fire('Error', 'No puedes eliminarte a ti mismo', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      text: `Estas apunto de eliminar el usuario ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminar( usuario ).subscribe(
          () => {

            this.cargarUsuarios();
            Swal.fire(
            'usuario eliminado',
            `${ usuario.nombre } fue eliminado correctamente`,
            'success'

          )}

        );
      }
    })
  }

  cambiarRole( usuario: Usuario ){
    this.usuarioService.actualizarRole( usuario )
        .subscribe( resp => {
      console.log(resp);
    } )
  }

  abrirModal( usuario:Usuario ){
    console.log(usuario);
    this.modalService.abrirModal( 'usuarios', usuario.uid, usuario.img );
  }
}
