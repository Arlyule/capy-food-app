import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RiveSMInput } from 'ng-rive';
import { Router } from '@angular/router';
import { Login, RespuestaLogin } from '../../../models/login';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'cr-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  @Output() onClose = new EventEmitter();

  email = '';
  password = '';
  isLoading = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() { }

  signIn(
    success: RiveSMInput,
    failure: RiveSMInput,
    reset: RiveSMInput,
    confetti: RiveSMInput
  ) {
    this.isLoading = true;
    const isValid = this.email.trim() !== '' && this.password.trim() !== '';

    setTimeout(() => {
      isValid ? success?.fire() : failure?.fire();
    }, 1000);

    setTimeout(() => {
      this.isLoading = false;
      reset?.fire();
      isValid && confetti?.fire();
    }, 3000);

    if (isValid) {
      // Llamamos al servicio de Login con las credenciales
      const loginData: Login = {
        username: this.email,
        password: this.password
      };

      this.loginService.login(loginData).subscribe(
        (response: RespuestaLogin) => {
          if (response.codigo === 0) {
            // Guardamos los datos de login en el localStorage
            localStorage.setItem('user', JSON.stringify(response.objeto));


            // Limpiamos los campos de email y password
            this.email = '';
            this.password = '';

            // Redirigimos al usuario a la página de inicio
            this.router.navigate(['/publicaciones']).then(() => {
              window.location.reload();
            });

          } else {
            // Si el login falla, mostramos un mensaje de error
            failure?.fire();
          }
        },
        (error) => {
          failure?.fire();
        }
      );
    }

    // Si es inválido, ejecutamos un fallo
    setTimeout(() => {
      this.isLoading = false;
      reset?.fire();
      failure?.fire();
    }, 4000);
  }

  onSignInClose() {
    this.onClose.emit();
  }
}
