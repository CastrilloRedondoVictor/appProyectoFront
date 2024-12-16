import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CharlasService {

  constructor(private authService: AuthService, private _http: HttpClient) { }


  getRondasCurso(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let request = 'api/Rondas/RondasCurso';
    return this._http.get(environment.urlApiCharlas + request, { headers })
  }

  getCharlasRonda(ronda: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let request = 'api/Charlas/CharlasRonda/' + ronda;
    return this._http.get(environment.urlApiCharlas + request, { headers })
  }

  getCharlasAlumno(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let request = 'api/Charlas/CharlasAlumno';
    return this._http.get(environment.urlApiCharlas + request, { headers })
  }
}
