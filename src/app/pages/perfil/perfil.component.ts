import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imgUp!: File;
  public imgTemp!: any;

  constructor( private fb: FormBuilder,
                private usuarioService: UsuarioService,
                private fileUploadService: FileUploadService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required ],
      email: [ this.usuario.email, [Validators.required, Validators.email] ],
    });
  }

  actualizarPerfil(){
    console.log(this.perfilForm.value)
    this.usuarioService.actualizarUsuario( this.perfilForm.value )
      .subscribe({next: () => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Correcto', 'Información modificada', 'success');
      },
      error: err => {
        Swal.fire('Error', err.error.msg, 'error')
      }
      })
  }

  cambiarImagen( event: any ){
    const files = event.target.files[0];
    this.imgUp = files;

    if ( !files ){
      this.imgTemp = null;
      return;
     }

    const reader = new FileReader();
    reader.readAsDataURL( files );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImg(){
    this.fileUploadService
        .actualizarFoto( this.imgUp, 'usuarios', this.usuario.uid )
        .subscribe( {next: (resp: any) => {
          this.usuario.img = resp.nombreArchivo;
          console.log(resp)
        Swal.fire('Correcto', 'Imagen actualizada', 'success');
        },
        error: err => {
          Swal.fire('Error', err.error.msg, 'error')
        }
        })
  }


}
