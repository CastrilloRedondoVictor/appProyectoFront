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
  }

  getImagenPerfil(): string {
    return this.perfil.imagen || 'assets/images/default-profile.png';
  }
}
