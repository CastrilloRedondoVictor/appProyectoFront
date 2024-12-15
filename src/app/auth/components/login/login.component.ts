import { Component, ElementRef, ViewChild } from '@angular/core';
import { Login } from '../../../models/login';
import { ServiceLogin } from '../../../services/service.login';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent{
  @ViewChild('cajaLoginUserName') cajaLoginUserName!: ElementRef;
  @ViewChild('cajaLoginPassword') cajaLoginPassword!: ElementRef;
  public login!: Login;

  constructor(private _service: ServiceLogin, private _router: Router) {}

  hacerLogin(): void {
    var email = this.cajaLoginUserName.nativeElement.value;
    var password = this.cajaLoginPassword.nativeElement.value;

    this.login = new Login(email, password);
    this._service.login(this.login).subscribe(
      (response) => {
        // environment.token = response.response;
        localStorage.setItem('authToken', response.response);
        this._router.navigate(['/']);
      },
      () => {
        Swal.fire({
          title: 'Error de autenticación',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
          confirmButtonText: 'ACEPTAR',
          background: '#2b2e38', // Fondo de la tarjeta
          color: '#c4c3ca', // Color del texto
          focusConfirm: false,
          buttonsStyling: false, // Desactiva los estilos predeterminados
          didOpen: () => {
            const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
            if (confirmButton) {
              // Estilos iniciales
              confirmButton.style.backgroundColor = '#ffeba7';
              confirmButton.style.color = '#2b2e38';
              confirmButton.style.padding = '10px 20px';
              confirmButton.style.border = 'none';
              confirmButton.style.borderRadius = '4px';
              confirmButton.style.transition = 'all 0.3s ease'; // Transición suave

              // Hover con JavaScript
              confirmButton.addEventListener('mouseover', () => {
                confirmButton.style.backgroundColor = '#000000'; // Gris claro
                confirmButton.style.color = '#ffeba7';
              });

              confirmButton.addEventListener('mouseout', () => {
                confirmButton.style.backgroundColor = '#ffeba7'; // Amarillo suave
                confirmButton.style.color = '#000000'; // Azul-gris oscuro
              });
            }
          },
        });
      }
    );
  }


  hacerRegister(): void {
    var email = this.cajaLoginUserName.nativeElement.value;
    var password = this.cajaLoginPassword.nativeElement.value;

    this.login = new Login(email, password);
    this._service.login(this.login).subscribe(
      (response) => {
        // environment.token = response.response;
        localStorage.setItem('authToken', response.response);
        this._router.navigate(['/']);
      },
      () => {
        Swal.fire({
          title: 'Error de autenticación',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
          confirmButtonText: 'ACEPTAR',
          background: '#2b2e38', // Fondo de la tarjeta
          color: '#c4c3ca', // Color del texto
          focusConfirm: false,
          buttonsStyling: false, // Desactiva los estilos predeterminados
          didOpen: () => {
            const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
            if (confirmButton) {
              // Estilos iniciales
              confirmButton.style.backgroundColor = '#ffeba7';
              confirmButton.style.color = '#2b2e38';
              confirmButton.style.padding = '10px 20px';
              confirmButton.style.border = 'none';
              confirmButton.style.borderRadius = '4px';
              confirmButton.style.transition = 'all 0.3s ease'; // Transición suave

              // Hover con JavaScript
              confirmButton.addEventListener('mouseover', () => {
                confirmButton.style.backgroundColor = '#000000'; // Gris claro
                confirmButton.style.color = '#ffeba7';
              });

              confirmButton.addEventListener('mouseout', () => {
                confirmButton.style.backgroundColor = '#ffeba7'; // Amarillo suave
                confirmButton.style.color = '#000000'; // Azul-gris oscuro
              });
            }
          },
        });
      }
    );
  }
}
