import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CharlaSin, Ronda } from '../../../models/charla';
import { CharlasService } from '../../../services/charlas-service.service';
import { Router } from '@angular/router';
import { Perfil } from '../../../models/alumno';
import { AuthService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-post-charla',
  standalone: false,

  templateUrl: './post-charla.component.html',
  styleUrls: ['./post-charla.component.css', '../../../app.component.css'],
})
export class PostCharlaComponent implements OnInit {
  @ViewChild('cajaTitulo') cajaTitulo!: ElementRef;
  @ViewChild('cajaDescripcion') cajaDescripcion!: ElementRef;
  @ViewChild('cajaTiempo') cajaTiempo!: ElementRef;

  public charla!: CharlaSin;
  public perfil!: Perfil;
  public ronda!: Ronda;

  constructor(
    private _service: CharlasService,
    private _servicePerfil: AuthService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this._servicePerfil.getPerfil().subscribe((response) => {
      this.perfil = response.usuario;
    });

    this._service.getRondasCurso().subscribe((response) => {
      this.ronda = response;
    });
  }

  nuevaCharla(): void {
    var titulo = this.cajaTitulo.nativeElement.value;
    var descripcion = this.cajaDescripcion.nativeElement.value;
    var tiempo = this.cajaTiempo.nativeElement.value;

    this.charla = new CharlaSin(
      1,
      titulo,
      descripcion,
      tiempo,
      this.ronda.fechaPresentacion,
      this.perfil.idUsuario,
      1,
      this.ronda.idRonda,
      ''
    );
    console.log(this.charla);

    
    this._service.postCharla(this.charla).subscribe((response) => {
      console.log('creado exitosamente');
    });
  }
}
