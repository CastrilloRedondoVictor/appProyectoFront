import { Component, ElementRef, ViewChild } from '@angular/core';
import { Login } from '../../../models/login';
import { ServiceLogin } from '../../../services/service.login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent{
  @ViewChild('cajaUserName') cajaUserName!: ElementRef;
  @ViewChild('cajaPassword') cajaPassword!: ElementRef;
  public login!: Login;

  constructor(private _service: ServiceLogin, private _router: Router) {}

  hacerLogin(): void {
    var email = this.cajaUserName.nativeElement.value;
    var password = this.cajaPassword.nativeElement.value;

    this.login = new Login(email, password);
    this._service.login(this.login).subscribe(
      (response) => {
        // environment.token = response.response;
        localStorage.setItem('authToken', response.response);
        this._router.navigate(['/']);
      },
      () => {
        alert(
          'Usuario o contraseña incorrectos, por favor intente nuevamente.'
        );
      }
    );
  }
}
