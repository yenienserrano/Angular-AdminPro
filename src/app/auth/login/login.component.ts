import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2'

declare const gapi: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ "./login.component.css" ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false
  public auth2: any

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || "", [ Validators.required, Validators.email ]],
    password: ['', Validators.required],
    recordar: localStorage.getItem('recordar') || false,
  })

  constructor( private router: Router,
               private usuarioService: UsuariosService,
               private fb: FormBuilder,
               private ngZone: NgZone 
  ) { }

  ngOnInit(): void {
    this.renderButton()
  }

  login(){

    this.usuarioService.login( this.loginForm.value )
                        .subscribe( res => {
                          
                          if( this.loginForm.get('recordar').value ){
                            localStorage.setItem('email', this.loginForm.get('email').value )
                            localStorage.setItem('recordar', this.loginForm.get('recordar').value )
                          } else {
                            localStorage.removeItem('email')
                            localStorage.removeItem('recordar')
                          }
                          this.router.navigateByUrl('/dashboard')

                        },
                        (err) => Swal.fire('Error', err.error.msg, "error" ) )

  }

  
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp()
  }
  
  async startApp() {
    
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;

    this.attachSignin( document.getElementById('my-signin2') );
    
  };
  
  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        
        this.usuarioService.loginGoogle( id_token ).subscribe( resp => this.ngZone.run( resp => this.router.navigateByUrl('/dashboard')))

      }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
