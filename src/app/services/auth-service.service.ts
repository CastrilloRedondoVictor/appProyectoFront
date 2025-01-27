import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AlumnoRegister } from '../models/alumno';
import { Perfil } from '../models/perfil';
import { FileModel } from '../models/fileModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isTokenExpired(): boolean {
    const expiresAt = localStorage.getItem('tokenExpiresAt');
    if (!expiresAt) return true;
    return new Date().getTime() > JSON.parse(expiresAt);
  }

  clearToken(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('idRole');
    localStorage.removeItem('tokenExpiresAt');
  }

  isLogged(): boolean {
    return !!(this.getToken() && !this.isTokenExpired());
  }

  login(login: Login): Observable<any> {
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    let request = 'api/Auth/Login';
    return this._http.post(
      environment.urlApiCharlas + request,
      JSON.stringify(login),
      { headers: headers }
    );
  }

  getPerfil(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    let request = 'api/Usuarios/Perfil';
    return this._http.get(environment.urlApiCharlas + request, { headers });
  }

  getAlumnosCursoProfesor(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    let request = 'api/Profesor/AlumnosCursoProfesor';
    return this._http.get(environment.urlApiCharlas + request, { headers });
  }

  getRolUsuario(): string | null {
    return localStorage.getItem('idRole');
  }

  postAlumno(alumno: AlumnoRegister, idCurso: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let request = 'api/Usuarios/NewAlumno/' + idCurso;
    return this._http.post(
      environment.urlApiCharlas + request,
      JSON.stringify(alumno),
      { headers }
    );
  }

  postFile(fileModel: FileModel, id: number): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let request = 'api/Files/UploadImagenUsuario/' + id;
    return this._http.post(
      environment.urlApiCharlas + request,
      JSON.stringify(fileModel),
      { headers }
    );
  }

  updatePassword(newPassword: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const request = 'api/Usuarios/UpdatePasswordUsuario';
    const body = { newPassword };
    return this._http.put(
      environment.urlApiCharlas + request,
      JSON.stringify(body),
      { headers }
    );
  }

  getCursos(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    let request = 'api/cursos';
    return this._http.get(environment.urlApiCharlas + request, { headers });
  }

  updateEstadoCurso(idCurso: number, estado: boolean): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let request = `api/Cursos/UpdateEstadoCurso/${idCurso}/${estado}`;
    return this._http.put(environment.urlApiCharlas + request, {}, { headers });
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
