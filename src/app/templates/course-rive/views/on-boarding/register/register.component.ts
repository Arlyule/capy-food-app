import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { Registro } from '../../../models/login';
import { RiveSMInput } from 'ng-rive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() onClose = new EventEmitter();

  username = '';
  email = '';
  password = '';
  rol_id = 1;
  isLoading = false;

  constructor(
    private registerService: LoginService,
    private router: Router
  ) { }

  ngOnInit() { }

  register(
    success: RiveSMInput,
    failure: RiveSMInput,
    reset: RiveSMInput,
    confetti: RiveSMInput
  ) {
    this.isLoading = true;
    const isValid = this.username.trim() !== '' && this.email.trim() !== '' && this.password.trim() !== '';

    setTimeout(() => {
      isValid ? success?.fire() : failure?.fire();
    }, 1000);

    setTimeout(() => {
      this.isLoading = false;
      reset?.fire();
      isValid && confetti?.fire();
    }, 3000);

    if (isValid) {
      const registroData: Registro = {
        username: this.username,
        password: this.password,
        correo: this.email,
        rol_id: 1,
      };

      this.registerService.register(registroData).subscribe(
        (response) => {
          if (response = "Usuario registrado con éxito") {
            this.username = '';
            this.email = '';
            this.password = '';
            this.onSignInClose();
            success?.fire();
          } else {
            failure?.fire();
            setTimeout(() => {
              alert('Error al registrar el usuario');
            }, 1500);
          }
        },
        (error) => {
          this.isLoading = false;
          failure?.fire();
          setTimeout(() => {
            alert('Error al registrar el usuario');
          }, 1500);
        }
      );
    } else {
      this.isLoading = false;
      reset?.fire();
      failure?.fire();
      alert('Por favor, completa todos los campos');
    }
  }

  onSignInClose() {
    this.onClose.emit();
  }
}
