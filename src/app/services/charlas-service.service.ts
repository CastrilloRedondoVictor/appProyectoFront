import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Charla, CharlaSin } from '../models/charla';
import { Voto } from '../models/voto';
import { FileModel } from '../models/fileModel';
import {
  Comentarios,
  ComentariosSin,
  Recursos,
} from '../models/charlaDetalles';

@Injectable({
  providedIn: 'root',
})
export class CharlasService {
  constructor(private authService: AuthService, private _http: HttpClient) {}

  getRondasCurso(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    let request = 'api/Rondas/RondasCurso';
    return this._http.get(environment.urlApiCharlas + request, { headers });
  }

  getCharlasRonda(idRonda: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    let request = 'api/Charlas/CharlasRonda/' + idRonda;
    return this._http.get(environment.urlApiCharlas + request, { headers });
  }

  getCharlasAlumno(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    let request = 'api/Charlas/CharlasAlumno';
    return this._http.get(environment.urlApiCharlas + request, { headers });
  }

  getVotosRondaAlumno(idRonda: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    let request = 'api/Votos/VotoAlumnoRonda/' + idRonda;
    return this._http.get(environment.urlApiCharlas + request, { headers });
  }

  getCharlasRondaEstado(idRonda: number, idEstado: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    let request = `api/Charlas/CharlasRondaEstado/${idRonda}/${idEstado}`;
    return this._http.get(environment.urlApiCharlas + request, { headers });
  }

  getEstadosCharlas(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    let request = 'api/EstadosCharlas';
    return this._http.get(environment.urlApiCharlas + request, { headers });
  }

  postCharla(charla: CharlaSin): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let request = 'api/charlas';
    return this._http.post(
      environment.urlApiCharlas + request,
      JSON.stringify(charla),
      { headers }
    );
  }

  putCharla(charla: CharlaSin): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let request = 'api/charlas';
    return this._http.put(
      environment.urlApiCharlas + request,
      JSON.stringify(charla),
      { headers }
    );
  }

  updateEstadoCharla(idCharla: number, idEstado: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let request = `api/Profesor/UpdateEstadoCharla/${idCharla}/${idEstado}`;
    return this._http.put(environment.urlApiCharlas + request, {}, { headers });
  }

  deleteCharla(idCharla: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    let request = 'api/Charlas/' + idCharla;
    return this._http.delete(environment.urlApiCharlas + request, { headers });
  }

  postComentario(comentario: ComentariosSin): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let request = 'api/comentarios';
    return this._http.post(
      environment.urlApiCharlas + request,
      JSON.stringify(comentario),
      { headers }
    );
  }
  deleteComentario(idComentario: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    let request = 'api/Comentarios/' + idComentario;
    return this._http.delete(environment.urlApiCharlas + request, { headers });
  }

  postRecurso(recurso: Recursos): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let request = 'api/recursos';
    return this._http.post(
      environment.urlApiCharlas + request,
      JSON.stringify(recurso),
      { headers }
    );
  }

  postVoto(voto: Voto): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let request = 'api/Votos';
    return this._http.post(
      environment.urlApiCharlas + request,
      JSON.stringify(voto),
      { headers }
    );
  }

  getRonda(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let request = 'api/Rondas/' + id;
    return this._http.get(environment.urlApiCharlas + request, { headers });
  }

  getCharlaById(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const url = `${environment.urlApiCharlas}api/Charlas/${id}`;
    return this._http.get(url, { headers });
  }

  getCharlasCurso(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    let request = 'api/Charlas/CharlasCurso';
    return this._http.get(environment.urlApiCharlas + request, { headers });
  }

  postFile(fileModel: FileModel, id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let request = 'api/Files/UploadImagenCharla/' + id;
    return this._http.post(
      environment.urlApiCharlas + request,
      JSON.stringify(fileModel),
      { headers }
    );
  }
}
