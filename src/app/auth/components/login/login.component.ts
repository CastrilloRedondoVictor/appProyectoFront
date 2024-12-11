import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Login } from '../../../models/login';
import { ServiceLogin } from '../../../services/service.login';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
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
        environment.token = response.response;
        console.log(environment.token);
      },
      () => {
        alert(
          'Usuario o contraseña incorrectos, por favor intente nuevamente.'
        );
      }
    );
  }

  ngOnInit(): void {
    environment.token = '';
  }
}
