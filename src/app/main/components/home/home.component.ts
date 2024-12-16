import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Alumno } from '../../../models/alumno';
import { AuthService } from '../../../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../app.component.css'],
})
export class HomeComponent implements OnInit {
  public alumno!: Alumno;

  constructor(private _service: AuthService) {}

  ngOnInit(): void {
    this._service.getPerfil().subscribe((response) => {
      this.alumno = response.usuario;
    });
  }
}
