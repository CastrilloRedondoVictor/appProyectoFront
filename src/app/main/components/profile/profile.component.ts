import { Component, OnInit } from '@angular/core';
import { Perfil } from '../../../models/alumno';
import { AuthService } from '../../../services/auth-service.service';
import { AlumnosCursoProfesor } from '../../../models/perfil';

@Component({
  selector: 'app-profile',
  standalone: false,

  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../../app.component.css']
})
export class ProfileComponent implements OnInit {
  public perfil!: Perfil;
  public rolUsuario!: string | null;
  public alumnosCursos!: AlumnosCursoProfesor[];
  public listaCursos: any[] = [];
  public cursosAbiertos: { [key: number]: boolean } = {};

  constructor(private _service: AuthService) {}

  ngOnInit(): void {
    this._service.getPerfil().subscribe((response) => {
      this.perfil = response.usuario;
    });
    this.rolUsuario = this._service.getRolUsuario()
    if(this.rolUsuario == '1') {
      this._service.getAlumnosCursoProfesor().subscribe((response: AlumnosCursoProfesor[]) => {
        this.alumnosCursos= response
      });
      // this.alumnosCursos.filter(alumno => alumno.alumnos.alumno.idRole == 2)
    }

    if (this.rolUsuario == '3') {
      this._service.getCursos().subscribe((response: any[]) => {
        this.listaCursos = response;
      });
    }
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
        console.log(`Curso ${curso.nombre} actualizado correctamente a ${nuevoEstado ? 'Activo' : 'Inactivo'}.`);
      },
      error: (err) => {
        console.error('Error al actualizar el curso:', err);
      }
    });
  }

  getImagenPerfil(): string {
    return this.perfil.imagen || 'assets/images/default-profile.png';
  }
}
