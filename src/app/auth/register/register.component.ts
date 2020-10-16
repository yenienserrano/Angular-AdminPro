import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'


import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false

  public resgisterForm = this.fb.group({
    nombre: ['Ian', Validators.required],
    email: ['yenienserrano@live.com.ar', [ Validators.required, Validators.email ]],
    password: ['12345', Validators.required],
    password2: ['12345', Validators.required],
    terminos: [true, Validators.required],
  }, {
    validators: this.contrasenasIguales('password', 'password2')
  })

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router
  ) { }

    crearUsuario(){
      this.formSubmitted = true
      console.log(this.resgisterForm.value)

      if( this.resgisterForm.invalid ){
        return console.log( 'Cuenta no creada' )
      }

      this.usuariosService.crearUsuario( this.resgisterForm.value )
                          .subscribe( res => {
                            console.log('Usuario creado')
                            console.log(res)
                            this.router.navigateByUrl('/dashboard')
                          }, (err) => Swal.fire('Error', err.error.msg, "error" ) )
    }

    campoNoValido( campo: string ){
      if( this.resgisterForm.get( campo ).invalid && this.formSubmitted ){
        return true
      } else {
        return false
      }
    }

    aceptaTerminos(): boolean{
      return !this.resgisterForm.get('terminos').value && this.formSubmitted
    }

    contrasenasNoSonIguales(){
      const pass1 = this.resgisterForm.get('password').value
      const pass2 = this.resgisterForm.get('password2').value

      if( pass1 !== pass2 && this.formSubmitted ){
        return true
      } else {
        return false
      }
    }

    contrasenasIguales(pass1Name: string, pass2Name: string){

      return ( formGrup: FormGroup ) => {
        const pass1 = formGrup.get( pass1Name )
        const pass2 = formGrup.get( pass2Name )

        if( pass1.value === pass2.value ){
          pass2.setErrors(null)
        } else {
          pass2.setErrors({ noEsIgual: true })
        }
      }
    }
}
