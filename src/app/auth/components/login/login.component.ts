import { Component, ElementRef, ViewChild } from '@angular/core';
import { Login } from '../../../models/login';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlumnoRegister } from '../../../models/alumno';
import { AuthService } from '../../../services/auth-service.service';


@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent{
  @ViewChild('cajaLoginUserName') cajaLoginUserName!: ElementRef;
  @ViewChild('cajaLoginPassword') cajaLoginPassword!: ElementRef;

  @ViewChild('cajaRegisterNombre') cajaRegisterNombre!: ElementRef;
  @ViewChild('cajaRegisterApellidos') cajaRegisterApellidos!: ElementRef;
  @ViewChild('cajaRegisterCurso') cajaRegisterCurso!: ElementRef;
  @ViewChild('cajaRegisterEmail') cajaRegisterEmail!: ElementRef;
  @ViewChild('cajaRegisterPassword') cajaRegisterPassword!: ElementRef;

  @ViewChild('regLogCheckbox') regLogCheckbox!: ElementRef<HTMLInputElement>;

  public login!: Login;
  public alumno!: AlumnoRegister;

  constructor(private _service: AuthService, private _router: Router) {}

  hacerLogin(): void {
    var email = this.cajaLoginUserName.nativeElement.value;
    var password = this.cajaLoginPassword.nativeElement.value;

    this.login = new Login(email, password);
    this._service.login(this.login).subscribe(
      (response) => {
        localStorage.setItem('authToken', response.response);
        localStorage.setItem('idRole', response.idrole);
        this._router.navigate(['/']);
      },
      () => {
        Swal.fire({
          title: 'Error de autenticación',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
          confirmButtonText: 'ACEPTAR',
          background: '#2b2e38',
          color: '#c4c3ca',
          focusConfirm: false,
          buttonsStyling: false,
          didOpen: () => {
            const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
            if (confirmButton) {
              // Estilos iniciales
              confirmButton.style.backgroundColor = '#ffeba7';
              confirmButton.style.color = '#2b2e38';
              confirmButton.style.padding = '10px 20px';
              confirmButton.style.border = 'none';
              confirmButton.style.borderRadius = '4px';
              confirmButton.style.transition = 'all 0.3s ease';

              // Hover con JavaScript
              confirmButton.addEventListener('mouseover', () => {
                confirmButton.style.backgroundColor = '#000000';
                confirmButton.style.color = '#ffeba7';
              });

              confirmButton.addEventListener('mouseout', () => {
                confirmButton.style.backgroundColor = '#ffeba7';
                confirmButton.style.color = '#000000';
              });
            }
          },
        });
      }
    );
  }


  hacerRegister(): void {
    var nombre = this.cajaRegisterNombre.nativeElement.value;
    var apellidos = this.cajaRegisterApellidos.nativeElement.value;
    var emaul = this.cajaRegisterEmail.nativeElement.value;
    var password = this.cajaRegisterPassword.nativeElement.value;

    this.alumno = new AlumnoRegister(1, nombre, apellidos, emaul, true, '', password, 2);
    this._service.postAlumno(this.alumno, this.cajaRegisterCurso.nativeElement.value).subscribe(
      (response) => {
        this.regLogCheckbox.nativeElement.checked = false;
      },
      () => {
        Swal.fire({
          title: 'Error de creación',
          text: 'Ha habido un error al crear el usuario',
          icon: 'error',
          confirmButtonText: 'ACEPTAR',
          background: '#2b2e38',
          color: '#c4c3ca',
          focusConfirm: false,
          buttonsStyling: false,
          didOpen: () => {
            const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
            if (confirmButton) {
              // Estilos iniciales
              confirmButton.style.backgroundColor = '#ffeba7';
              confirmButton.style.color = '#2b2e38';
              confirmButton.style.padding = '10px 20px';
              confirmButton.style.border = 'none';
              confirmButton.style.borderRadius = '4px';
              confirmButton.style.transition = 'all 0.3s ease';

              confirmButton.addEventListener('mouseover', () => {
                confirmButton.style.backgroundColor = '#000000';
                confirmButton.style.color = '#ffeba7';
              });

              confirmButton.addEventListener('mouseout', () => {
                confirmButton.style.backgroundColor = '#ffeba7';
                confirmButton.style.color = '#000000';
              });
            }
          },
        });
      }
    );
  }
}
