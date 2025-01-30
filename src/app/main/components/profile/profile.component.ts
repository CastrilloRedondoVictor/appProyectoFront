import { Component, OnInit } from '@angular/core';
import { Perfil } from '../../../models/alumno';
import { AuthService } from '../../../services/auth-service.service';
import { AlumnosCursoProfesor } from '../../../models/perfil';
import { Charla } from '../../../models/charla';
import { CharlasService } from '../../../services/charlas-service.service';
import { CharlaDetalles } from '../../../models/charlaDetalles';
import Swal from 'sweetalert2';

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
  public usersAbiertos: { [key: number]: boolean } = {};
  public alumnosAbiertos: { [key: number]: boolean } = {};
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
      this.getCursos();
    }
  }

  getCursos() {
    this._service.getCursos().subscribe((response: any[]) => {
      this.listaCursos = response;
    });
  }

  getHoras(tiempo: number): number {
    return Math.floor(tiempo / 60);
  }

  // Método para abrir/cerrar los detalles de cada curso
  toggleCurso(idCurso: number): void {
    this.cursosAbiertos[idCurso] = !this.cursosAbiertos[idCurso];
  }

  toggleAlumnos(idCurso: number): void {
    this.alumnosAbiertos[idCurso] = !this.alumnosAbiertos[idCurso];
  }


  // Método para cambiar estado entre true/false
  toggleActivo(curso: any): void {
    const nuevoEstado = !curso.activo;

    this._service.updateEstadoCurso(curso.idCurso, nuevoEstado).subscribe({
      next: () => {
        curso.activo = nuevoEstado;

        // Mostrar alerta de éxito
        Swal.fire({
          title: `Curso ${curso.nombre} actualizado correctamente a ${nuevoEstado ? 'Activo' : 'Inactivo'}.`,
          text: 'El estado del curso ha sido modificado exitosamente.',
          icon: 'success',
          confirmButtonText: 'ACEPTAR',
          background: '#2b2e38',
          color: '#c4c3ca',
          focusConfirm: false,
          buttonsStyling: false,
          didOpen: () => {
            const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
            if (confirmButton) {
              // Estilos iniciales
              confirmButton.style.backgroundColor = '#ffeba7';
              confirmButton.style.color = '#2b2e38';
              confirmButton.style.padding = '10px 20px';
              confirmButton.style.border = 'none';
              confirmButton.style.borderRadius = '4px';
              confirmButton.style.transition = 'all 0.3s ease';

              // Hover con JavaScript
              confirmButton.addEventListener('mouseover', () => {
                confirmButton.style.backgroundColor = '#000000';
                confirmButton.style.color = '#ffeba7';
              });

              confirmButton.addEventListener('mouseout', () => {
                confirmButton.style.backgroundColor = '#ffeba7';
                confirmButton.style.color = '#000000';
              });
            }
          }
        });
      },
      error: (err) => {
        console.error('Error al actualizar el estado del curso:', err);
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

    this.usersAbiertos[idCurso] = !this.usersAbiertos[idCurso];
  }

  cambiarRol(miembro: any, event: any): void {
    const nuevoRol = parseInt(event.target.value, 10);
    miembro.idRole = nuevoRol;

    this._service.updateRolUsuario(miembro.idUsuario, nuevoRol).subscribe({
        next: () => {
            Swal.fire({
                    title: `Rol actualizado correctamente a ${nuevoRol === 1 ? 'Profesor' : 'Alumno'}.`,
                    text: 'El usuario ha sido actualizado correctamente.',
                    icon: 'success',
                    confirmButtonText: 'ACEPTAR',
                    background: '#2b2e38',
                    color: '#c4c3ca',
                    focusConfirm: false,
                    buttonsStyling: false,
                    didOpen: () => {
                      const confirmButton = document.querySelector(
                        '.swal2-confirm'
                      ) as HTMLElement;
                      if (confirmButton) {
                        // Estilos iniciales
                        confirmButton.style.backgroundColor = '#ffeba7';
                        confirmButton.style.color = '#2b2e38';
                        confirmButton.style.padding = '10px 20px';
                        confirmButton.style.border = 'none';
                        confirmButton.style.borderRadius = '4px';
                        confirmButton.style.transition = 'all 0.3s ease';

                        // Hover con JavaScript
                        confirmButton.addEventListener('mouseover', () => {
                          confirmButton.style.backgroundColor = '#000000';
                          confirmButton.style.color = '#ffeba7';
                        });

                        confirmButton.addEventListener('mouseout', () => {
                          confirmButton.style.backgroundColor = '#ffeba7';
                          confirmButton.style.color = '#000000';
                        });
                      }
                    },
                  });
        },
        error: (err) => {
            console.error('Error al actualizar el rol:', err);
        }
    });
  }

  toggleEstadoUsuario(miembro: any): void {
    const nuevoEstado = !miembro.estadoUsuario;

    this._service.updateEstadoUsuario(miembro.idUsuario, nuevoEstado).subscribe({
      next: () => {
        miembro.estadoUsuario = nuevoEstado;

        // Mostrar alerta de éxito
        Swal.fire({
          title: `Estado actualizado correctamente a ${nuevoEstado ? 'Activo' : 'Inactivo'}.`,
          text: `El usuario ${miembro.usuario} ha sido actualizado exitosamente.`,
          icon: 'success',
          confirmButtonText: 'ACEPTAR',
          background: '#2b2e38',
          color: '#c4c3ca',
          focusConfirm: false,
          buttonsStyling: false,
          didOpen: () => {
            const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
            if (confirmButton) {
              // Estilos iniciales
              confirmButton.style.backgroundColor = '#ffeba7';
              confirmButton.style.color = '#2b2e38';
              confirmButton.style.padding = '10px 20px';
              confirmButton.style.border = 'none';
              confirmButton.style.borderRadius = '4px';
              confirmButton.style.transition = 'all 0.3s ease';

              // Hover con JavaScript
              confirmButton.addEventListener('mouseover', () => {
                confirmButton.style.backgroundColor = '#000000';
                confirmButton.style.color = '#ffeba7';
              });

              confirmButton.addEventListener('mouseout', () => {
                confirmButton.style.backgroundColor = '#ffeba7';
                confirmButton.style.color = '#000000';
              });
            }
          }
        });
      },
      error: (err) => {
        console.error('Error al actualizar el estado del usuario:', err);
      },
    });
  }

  getImagenPerfil(): string {
    return this.perfil.imagen || 'assets/images/default-profile.png';
  }


  eliminarCurso(idCurso: number) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Eliminarás el curso para siempre.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        background: '#2b2e38',
        color: '#c4c3ca',
        focusConfirm: false,
        buttonsStyling: false,
        didOpen: () => {
          // Estilizar contenedor de botones
          const buttonsContainer = document.querySelector(
            '.swal2-actions'
          ) as HTMLElement;
          if (buttonsContainer) {
            buttonsContainer.style.display = 'flex';
            buttonsContainer.style.justifyContent = 'space-between';
            buttonsContainer.style.gap = '20px'; // Espaciado entre botones
          }

          // Botón de confirmar
          const confirmButton = document.querySelector(
            '.swal2-confirm'
          ) as HTMLElement;
          if (confirmButton) {
            confirmButton.style.backgroundColor = '#ffeba7';
            confirmButton.style.color = '#2b2e38';
            confirmButton.style.padding = '10px 20px';
            confirmButton.style.border = 'none';
            confirmButton.style.borderRadius = '4px';
            confirmButton.style.transition = 'all 0.3s ease';

            confirmButton.addEventListener('mouseover', () => {
              confirmButton.style.backgroundColor = '#000000';
              confirmButton.style.color = '#ffeba7';
            });

            confirmButton.addEventListener('mouseout', () => {
              confirmButton.style.backgroundColor = '#ffeba7';
              confirmButton.style.color = '#2b2e38';
            });
          }

          // Botón de cancelar
          const cancelButton = document.querySelector(
            '.swal2-cancel'
          ) as HTMLElement;
          if (cancelButton) {
            cancelButton.style.backgroundColor = '#ff4d4d';
            cancelButton.style.color = '#ffffff';
            cancelButton.style.padding = '10px 20px';
            cancelButton.style.border = 'none';
            cancelButton.style.borderRadius = '4px';
            cancelButton.style.transition = 'all 0.3s ease';

            cancelButton.addEventListener('mouseover', () => {
              cancelButton.style.backgroundColor = '#ffffff';
              cancelButton.style.color = '#ff4d4d';
            });

            cancelButton.addEventListener('mouseout', () => {
              cancelButton.style.backgroundColor = '#ff4d4d';
              cancelButton.style.color = '#ffffff';
            });
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.charlasService.deleteCurso(idCurso).subscribe((response) => {
            Swal.fire({
              title: 'Curso eliminado',
              text: 'El curso se ha eliminado con éxito.',
              icon: 'success',
              confirmButtonText: 'ACEPTAR',
              background: '#2b2e38',
              color: '#c4c3ca',
              focusConfirm: false,
              buttonsStyling: false,
              didOpen: () => {
                const confirmButton = document.querySelector(
                  '.swal2-confirm'
                ) as HTMLElement;
                if (confirmButton) {
                  // Estilos iniciales
                  confirmButton.style.backgroundColor = '#ffeba7';
                  confirmButton.style.color = '#2b2e38';
                  confirmButton.style.padding = '10px 20px';
                  confirmButton.style.border = 'none';
                  confirmButton.style.borderRadius = '4px';
                  confirmButton.style.transition = 'all 0.3s ease';

                  // Hover con JavaScript
                  confirmButton.addEventListener('mouseover', () => {
                    confirmButton.style.backgroundColor = '#000000';
                    confirmButton.style.color = '#ffeba7';
                  });

                  confirmButton.addEventListener('mouseout', () => {
                    confirmButton.style.backgroundColor = '#ffeba7';
                    confirmButton.style.color = '#000000';
                  });
                }
              },
            });

            this.getCursos();
          }, (error:any) => {
                        Swal.fire({
                          title: 'Error al eliminar el curso',
                          text: 'No se ha podido eliminar el curso',
                          icon: 'error',
                          confirmButtonText: 'ACEPTAR',
                          background: '#2b2e38',
                          color: '#c4c3ca',
                          focusConfirm: false,
                          buttonsStyling: false,
                          didOpen: () => {
                            const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
                            if (confirmButton) {
                              // Estilos iniciales
                              confirmButton.style.backgroundColor = '#ffeba7';
                              confirmButton.style.color = '#2b2e38';
                              confirmButton.style.padding = '10px 20px';
                              confirmButton.style.border = 'none';
                              confirmButton.style.borderRadius = '4px';
                              confirmButton.style.transition = 'all 0.3s ease';

                              // Hover con JavaScript
                              confirmButton.addEventListener('mouseover', () => {
                                confirmButton.style.backgroundColor = '#000000';
                                confirmButton.style.color = '#ffeba7';
                              });

                              confirmButton.addEventListener('mouseout', () => {
                                confirmButton.style.backgroundColor = '#ffeba7';
                                confirmButton.style.color = '#000000';
                              });
                            }
                          },
                        });
                      }
            );
        }
      });
    }
}
