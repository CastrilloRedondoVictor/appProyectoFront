import { Component, OnInit } from '@angular/core';
import { Charla } from '../../../models/charla';
import { ActivatedRoute } from '@angular/router';
import { CharlasService } from '../../../services/charlas-service.service';
import {
  CharlaDetalles,
  ComentariosSin,
  Recursos,
} from '../../../models/charlaDetalles';
import { Perfil } from '../../../models/alumno';
import { AuthService } from '../../../services/auth-service.service';
import Swal from 'sweetalert2';

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
  public recurso!: Recursos;
  public perfil!: Perfil;
  comentariosAbiertos: boolean = false;
  recursosAbiertos: boolean = false;
  nuevoComentarioAbierto: boolean = false; // Controla la visibilidad del formulario
  nuevoComentarioContenido: string = ''; // Contenido del nuevo comentario
  nuevoRecursoAbierto: boolean = false;
  nuevoRecurso = { url: '', nombre: '', descripcion: '' };

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

  toggleNuevoRecurso(): void {
    this.nuevoRecursoAbierto = !this.nuevoRecursoAbierto;
  }

  crearComentario(): void {
    this.comentario = new ComentariosSin(
      1, // ID del comentario (puede ser generado automáticamente por el backend)
      this.idCharla, // ID de la charla
      this.perfil.idUsuario, // ID del usuario
      this.nuevoComentarioContenido, // Contenido del comentario
      new Date().toISOString() // Fecha del comentario
    );

    this.charlasService.postComentario(this.comentario).subscribe({
      next: () => {
        Swal.fire({
          title: 'Comentario añadido',
          text: 'Tu comentario se ha añadido correctamente.',
          icon: 'success',
          confirmButtonText: 'ACEPTAR',
          background: '#2b2e38',
          color: '#c4c3ca',
        });

        // Llama al método que recarga los detalles de la charla
        this.getCharlaDetalles();

        // Limpia el contenido del formulario y cierra el formulario de nuevo comentario
        this.nuevoComentarioContenido = '';
        this.nuevoComentarioAbierto = false;
      },
      error: (err) => {
        console.error('Error al añadir el comentario:', err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo añadir el comentario. Inténtalo de nuevo más tarde.',
          icon: 'error',
          confirmButtonText: 'ACEPTAR',
          background: '#2b2e38',
          color: '#c4c3ca',
        });
      },
    });
  }

  crearRecurso(): void {
    this.recurso = new Recursos(
      1,
      this.idCharla,
      this.nuevoRecurso.url,
      this.nuevoRecurso.nombre,
      this.nuevoRecurso.descripcion
    );

    this.charlasService.postRecurso(this.recurso).subscribe({
      next: () => {
        Swal.fire({
          title: 'Recurso añadido',
          text: 'Tu recurso se ha añadido correctamente.',
          icon: 'success',
          confirmButtonText: 'ACEPTAR',
          background: '#2b2e38',
          color: '#c4c3ca',
        });

        // Llama al método que recarga los detalles de la charla
        this.getCharlaDetalles();

        // Limpia el contenido del formulario y cierra el formulario de nuevo comentario
        this.nuevoRecurso = { url: '', nombre: '', descripcion: '' };
        this.nuevoRecursoAbierto = false;
      },
      error: (err) => {
        console.error('Error al añadir el recurso:', err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo añadir el recurso. Inténtalo de nuevo más tarde.',
          icon: 'error',
          confirmButtonText: 'ACEPTAR',
          background: '#2b2e38',
          color: '#c4c3ca',
        });
      },
    });
  }
}
