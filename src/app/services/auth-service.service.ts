import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient
  ) { }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLogged(): boolean {
    return !!localStorage.getItem('authToken');
  }


  login(login: Login): Observable<any> {
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    let request = 'api/Auth/Login';
    return this._http.post(environment.urlApiCharlas + request, JSON.stringify(login), { headers: headers });
  }

  getPerfil(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let request = 'api/Usuarios/Perfil';
    return this._http.post(environment.urlApiCharlas + request, { headers })
  }




  // getAlumnos(): Observable<any> {

  //   const token = this.getToken();
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });

  //   return this.http.get('https://apiejemplos.azurewebsites.net/api/Alumnos/AlumnosToken', { headers })
  // }

  // postAlumno(alumno: Alumno): Observable<any> {

  //   const token = this.getToken();
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.post('https://apiejemplos.azurewebsites.net/api/Alumnos/InsertAlumnoToken', JSON.stringify(alumno), { headers })
  // }
}
