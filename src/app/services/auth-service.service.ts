import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AlumnoRegister } from '../models/alumno';
import { Perfil } from '../models/perfil';
import { FileModel } from '../models/fileModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) { }

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

  getMiembrosCurso(idCurso: number): Observable<any[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const requestUrl = `api/Usuarios/UsuariosCurso/${idCurso}`;
    return this._http.get<any[]>(environment.urlApiCharlas + requestUrl, { headers });
  }

  updateRolUsuario(idUsuario: number, idRole: number): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let request = `api/Admin/UpdateRoleUsuario/${idUsuario}/${idRole}`;

    return this._http.put(environment.urlApiCharlas + request, {}, { headers });
  }

  updateNombreApellidosUsuario(perfil: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let request = 'api/Usuarios';
    let body = {
      idUsuario: perfil.idUsuario,
      nombre: perfil.nombre,
      apellidos: perfil.apellidos,
      email: perfil.email,  // ✅ Debemos incluir el email
      estadoUsuario: perfil.estadoUsuario,  // ✅ Estado del usuario
      imagen: perfil.imagen,  // ✅ Incluir la imagen
      password: "",  // ✅ Es requerido, pero lo enviamos vacío si no se cambia
      idRole: perfil.idRole,  // ✅ Enviar el rol actual del usuario
    };

    return this._http.put(environment.urlApiCharlas + request, body, { headers });
  }

  updateEstadoUsuario(idUsuario: number, estado: boolean): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let request = `api/Usuarios/UpdateEstadoUsuario/${idUsuario}/${estado}`;

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
