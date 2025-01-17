import { Component, OnInit } from '@angular/core';
import { Charla } from '../../../models/charla';
import { ActivatedRoute } from '@angular/router';
import { CharlasService } from '../../../services/charlas-service.service';
import { CharlaDetalles, ComentariosSin } from '../../../models/charlaDetalles';
import { Perfil } from '../../../models/alumno';
import { AuthService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-detalles-charla',
  standalone: false,

  templateUrl: './detalles-charla.component.html',
  styleUrls: ['./detalles-charla.component.css', '../../../app.component.css'],
})
export class DetallesCharlaComponent implements OnInit {
  idCharla!: number;
  charlasRonda!: Charla[];
  charlaDetalles!: CharlaDetalles;
  idRonda!: number;
  public comentario!: ComentariosSin;
  public perfil!: Perfil;
  comentariosAbiertos: boolean = false;
  recursosAbiertos: boolean = false;
  nuevoComentarioAbierto: boolean = false; // Controla la visibilidad del formulario
  nuevoComentarioContenido: string = ''; // Contenido del nuevo comentario

  constructor(
    private route: ActivatedRoute,
    private charlasService: CharlasService,
    private _servicePerfil: AuthService
  ) {}

  ngOnInit(): void {
    this._servicePerfil.getPerfil().subscribe((response) => {
      this.perfil = response.usuario;
    });
    // Obtener ID de ronda y charla desde los parámetros de la ruta
    this.idRonda = Number(this.route.snapshot.paramMap.get('idRonda'));
    this.idCharla = Number(this.route.snapshot.paramMap.get('idCharla'));

    // Cargar las charlas de la ronda y los detalles de la charla específica
    this.getCharlaDetalles();

    // Suscribirse a los cambios en los parámetros de la ruta
    this.route.paramMap.subscribe((params) => {
      this.idRonda = Number(params.get('idRonda'));
      this.idCharla = Number(params.get('idCharla'));
      this.getCharlaDetalles();
    });
  }

  getCharlaDetalles(): void {
    this.charlasService.getCharlaById(this.idCharla).subscribe({
      next: (response: CharlaDetalles) => {
        this.charlaDetalles = response;
        console.log(this.charlaDetalles);
      },
      error: (err) => {
        console.error('Error al obtener detalles de la charla:', err);
      },
    });
  }

  getImagen() {
    console.log(this.charlaDetalles.charla.imagenCharla)
    return this.charlaDetalles.charla.imagenCharla || 'assets/images/charlaImagen.jpg';
  }

  getHoras(tiempo: number): number {
    return Math.floor(tiempo / 60);
  }

  toggleComentarios(): void {
    this.comentariosAbiertos = !this.comentariosAbiertos;
  }

  toggleNuevoComentario(): void {
    this.nuevoComentarioAbierto = !this.nuevoComentarioAbierto;
  }

  toggleRecursos(): void {
    this.recursosAbiertos = !this.recursosAbiertos;
  }

  crearComentario(): void {
    this.comentario = new ComentariosSin(
      1,
      this.idCharla,
      this.perfil.idUsuario,
      this.nuevoComentarioContenido,
      new Date().toISOString()
    );

    this.charlasService
      .postComentario(this.comentario)
      .subscribe((response: ComentariosSin) => {
        alert('Comentario creado');
      });
  }
}
