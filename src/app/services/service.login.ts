import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable()
export class ServiceLogin {
  constructor(private _http: HttpClient) {}

  login(login: Login): Observable<any> {
    let json = JSON.stringify(login);
    let header = new HttpHeaders().set('Content-type', 'application/json');
    let request = 'api/Auth/Login';
    let url = environment.urlApiCharlas + request;
    return this._http.post(url, json, { headers: header });
  }
}
