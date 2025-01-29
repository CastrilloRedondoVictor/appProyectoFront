import { Component, OnInit } from '@angular/core';
import { Perfil } from '../../../models/alumno';
import { AuthService } from '../../../services/auth-service.service';
import { AlumnosCursoProfesor } from '../../../models/perfil';
import { Charla } from '../../../models/charla';
import { CharlasService } from '../../../services/charlas-service.service';
import { CharlaDetalles } from '../../../models/charlaDetalles';

@Component({
  selector: 'app-profile',
  standalone: false,

  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../../app.component.css'],
})
export class ProfileComponent implements OnInit {
  public perfil!: Perfil;
  public rolUsuario!: string | null;
  public alumnosCursos!: AlumnosCursoProfesor[];
  public listaCursos: any[] = [];
  public cursosAbiertos: { [key: number]: boolean } = {};
  public miembrosCursos: { [key: number]: any[] } = {};
  public charlasAlumno!: CharlaDetalles[];

  constructor(
    private _service: AuthService,
    private charlasService: CharlasService
  ) {}

  ngOnInit(): void {
    this._service.getPerfil().subscribe((response) => {
      this.perfil = response.usuario;
    });
    this.rolUsuario = this._service.getRolUsuario();
    if (this.rolUsuario == '2') {
      this.charlasService
        .getCharlasAlumno()
        .subscribe((response: CharlaDetalles[]) => {
          this.charlasAlumno = response;
          console.log(this.charlasAlumno);
          console.log(this.rolUsuario);
        });
    }
    if (this.rolUsuario == '1') {
      this._service
        .getAlumnosCursoProfesor()
        .subscribe((response: AlumnosCursoProfesor[]) => {
          this.alumnosCursos = response;
        });
      // this.alumnosCursos.filter(alumno => alumno.alumnos.alumno.idRole == 2)
    }

    if (this.rolUsuario == '3') {
      this._service.getCursos().subscribe((response: any[]) => {
        this.listaCursos = response;
      });
    }
  }

  getHoras(tiempo: number): number {
    return Math.floor(tiempo / 60);
  }

  // Método para abrir/cerrar los detalles de cada curso
  toggleCurso(idCurso: number): void {
    this.cursosAbiertos[idCurso] = !this.cursosAbiertos[idCurso];
  }

  // Método para cambiar estado entre true/false
  toggleActivo(curso: any): void {
    const nuevoEstado = !curso.activo;

    this._service.updateEstadoCurso(curso.idCurso, nuevoEstado).subscribe({
      next: () => {
        curso.activo = nuevoEstado;
        console.log(
          `Curso ${curso.nombre} actualizado correctamente a ${
            nuevoEstado ? 'Activo' : 'Inactivo'
          }.`
        );
      },
      error: (err) => {
        console.error('Error al actualizar el curso:', err);
      },
    });
  }

   // Método para abrir/cerrar la lista de miembros de un curso
   toggleMiembros(idCurso: number): void {
    if (this.miembrosCursos[idCurso]) {
      // Si ya existen los miembros, simplemente cerramos la lista
      delete this.miembrosCursos[idCurso];
    } else {
      // Si no existen, hacemos la petición a la API
      this._service.getMiembrosCurso(idCurso).subscribe({
        next: (response) => {
          this.miembrosCursos[idCurso] = response;
        },
        error: (err) => {
          console.error('Error al obtener los miembros del curso:', err);
        }
      });
    }
  }

  cambiarRol(miembro: any, event: any): void {
    const nuevoRol = parseInt(event.target.value, 10);
    miembro.idRole = nuevoRol;

    this._service.updateRolUsuario(miembro.idUsuario, nuevoRol).subscribe({
        next: () => {
            console.log(`Rol actualizado correctamente a ${nuevoRol === 1 ? 'Profesor' : 'Alumno'}.`);
        },
        error: (err) => {
            console.error('Error al actualizar el rol:', err);
        }
    });
  }

  getImagenPerfil(): string {
    return this.perfil.imagen || 'assets/images/default-profile.png';
  }
}
