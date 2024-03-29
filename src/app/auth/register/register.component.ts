import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['ed', [ Validators.required ]],
    email: ['de211@dfsf.com', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required ]],
    password2: ['', [ Validators.required ]],
    terminos: [true, [ Validators.required ]],
  },{
    validators: this.passwordsIguales( 'password', 'password2' )
  });

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private router: Router
    ) { }


  crearUsuario(){
    this.formSubmitted = true;
    console.log( this.registerForm.get('password')?.value );

    if( this.registerForm.invalid ){
      return;
    }

    //Realizar post
    this.usuarioService.crearUsuario( this.registerForm.value )
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          //Si sucede algun error
          Swal.fire('Error', err.error.msg, 'error');
        }
      })
  }

  // resp => {
  //   console.log('usuario Creado');
  //   console.log(resp);
  // }, (err) => {
  //   //Si sucede un error
  //   Swal.fire('Error', err.error.msg, 'error');
  // // }

  campoNoValido( campo : string): boolean{
    if( this.registerForm.get( campo )?.invalid && this.formSubmitted ){
      return true;
    }else{
      return false;
    }
  }

  passwordInvalid(){
    const pass = this.registerForm.get( 'password' )?.value;
    const pass2 = this.registerForm.get( 'password2' )?.value;

    if( (pass !== pass2) && this.formSubmitted ){
      return true;
    }else{
      return false;
    }
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  //Esta validacion personalizada regresa un objeto si da error o null si no hay errores
  passwordsIguales( pass1Name: string, pass2Name: string ){

    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if( pass1Control?.value === pass2Control?.value ){
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({ noEsIgual: true });
      }
    }

  }

}
