import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imgUp!: File;
  public imgTemp!: any;

  constructor(public modalService: ModalImagenService,
              private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalService.cerrarModal();
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
    const tipo = this.modalService.tipo;
    const id  = this.modalService.id;

    this.fileUploadService
        .actualizarFoto( this.imgUp, tipo, id )
        .subscribe( {next: (resp: any) => {
          console.log(resp)
          Swal.fire('Correcto', 'Imagen actualizada', 'success');

          this.modalService.nuevaImagen.emit(resp.img);

          this.cerrarModal();
        },
        error: err => {
          this.cerrarModal();
          Swal.fire('Error', err.error.msg, 'error')
        }
        })
  }

}
