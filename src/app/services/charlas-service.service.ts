import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Charla, CharlaSin } from '../models/charla';
import { Voto } from '../models/voto'
 
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
 
  postVoto(voto: Voto): Observable<any>{
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
    const url = `${environment.urlApiCharlas}api/Charlas/${id}?idcharla=${id}`;
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
}