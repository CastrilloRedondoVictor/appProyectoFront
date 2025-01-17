import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Perfil } from '../../../models/alumno';
import { CharlasService } from '../../../services/charlas-service.service';
import { AuthService } from '../../../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComentariosSin } from '../../../models/charlaDetalles';

@Component({
  selector: 'app-post-comentario',
  standalone: false,

  templateUrl: './post-comentario.component.html',
  styleUrls: [
    './post-comentario.component.css',
    '../../../app.component.css',
    '../../../auth/components/login/login.component.css',
  ],
})
export class PostComentarioComponent implements OnInit {
  @ViewChild('cajaContenido') cajaContenido!: ElementRef;

  public idCharla!: number;
  public comentario!: ComentariosSin;
  public perfil!: Perfil;

  constructor(
    private _service: CharlasService,
    private _servicePerfil: AuthService,
    private _router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._servicePerfil.getPerfil().subscribe((response) => {
      this.perfil = response.usuario;
    });

    this.idCharla = Number(this.route.snapshot.paramMap.get('idCharla'));
  }

  nuevoComentario(): void {
    var contenido = this.cajaContenido.nativeElement.value;

    this.comentario = new ComentariosSin(
      1,
      this.idCharla,
      this.perfil.idUsuario,
      contenido,
      new Date().toISOString()
    );

    this._service
      .postComentario(this.comentario)
      .subscribe((response: ComentariosSin) => {
        alert('Comentario creado');
      });
  }
}
