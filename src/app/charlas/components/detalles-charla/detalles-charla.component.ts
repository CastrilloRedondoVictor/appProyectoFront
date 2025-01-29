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
    return (
      this.charlaDetalles.charla.imagenCharla ||
      'assets/images/charlaImagen.jpg'
    );
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
          background: '#2b2e38',
          color: '#c4c3ca',
          confirmButtonColor: '#ffeba7', // Color de fondo del botón
          confirmButtonText: '<span style="color: #000;">ACEPTAR</span>',
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

  editarRecurso(recurso: Recursos): void {
    Swal.fire({
      title: 'Editar Recurso',
      html: `
        <style>
        @import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,800,900");

       @import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,800,900");

a:hover {
  text-decoration: none;
}
.link {
  color: #ffeba7;
}
.link:hover {
  color: #c4c3ca;
}
p {
  font-weight: 500;
  font-size: 14px;
}
h4 {
  font-weight: 600;
}
h6 span {
  padding: 0 20px;
  font-weight: 700;
}
.section {
  position: relative;
  width: 100%;
  display: block;
}
.full-height {
  min-height: 100vh;
}
[type="checkbox"]:checked,
[type="checkbox"]:not(:checked) {
  display: none;
}
.checkbox:checked + label,
.checkbox:not(:checked) + label {
  position: relative;
  display: block;
  text-align: center;
  width: 60px;
  height: 16px;
  border-radius: 8px;
  padding: 0;
  margin: 10px auto;
  cursor: pointer;
  background-color: #ffeba7;
}
.checkbox:checked + label:before,
.checkbox:not(:checked) + label:before {
  position: absolute;
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #ffeba7;
  background-color: #020305;
  font-family: "unicons";
  content: "\eb4f";
  z-index: 20;
  top: -10px;
  left: -10px;
  line-height: 36px;
  text-align: center;
  font-size: 24px;
  transition: all 0.5s ease;
}
.checkbox:checked + label:before {
  transform: translateX(44px) rotate(-270deg);
}
.card-3d-wrap {
  position: relative;
  width: 550px;
  max-width: 100%;
  height: 500px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  perspective: 800px;
  margin-top: 60px;
}
.card-3d-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: all 600ms ease-out;
}
.card-front,
.card-back {
  width: 100%;
  height: 100%;
  background-color: #2b2e38;
  position: absolute;
  border-radius: 6px;
  -webkit-transform-style: preserve-3d;
}
.card-back {
  transform: rotateY(180deg);
}
.checkbox:checked ~ .card-3d-wrap .card-3d-wrapper {
  transform: rotateY(180deg);
}
.center-wrap {
  position: absolute;
  width: 100%;
  padding: 0 35px;
  top: 50%;
  left: 0;
  transform: translate3d(0, -50%, 35px) perspective(100px);
  z-index: 20;
  display: block;
}
.form-group {
  position: relative;
  display: block;
  margin: 0;
  padding: 0;
}

.form-style {
  padding: 13px 20px;
  padding-left: 55px;
  height: 48px;
  width: 100%;
  font-weight: 500;
  border-radius: 4px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.5px;
  outline: none;
  color: #c4c3ca;
  background-color: #1f2029;
  border: none;
  transition: all 200ms linear;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.2);
}

/* Ajuste para campos con autofill */
input:-webkit-autofill {
  background-color: #1f2029 !important;
  -webkit-text-fill-color: #c4c3ca !important; /* Cambia el color del texto */
  box-shadow: 0 0 0px 1000px #1f2029 inset !important; /* Reemplaza el fondo */
  transition: background-color 200ms linear, -webkit-text-fill-color 200ms linear;
}

input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:not(:focus)
{
  background-color: #1f2029 !important;
  -webkit-text-fill-color: #c4c3ca !important;
  box-shadow: 0 0 0px 1000px #1f2029 inset !important;
}

.form-style:focus,
.form-style:active {
  border: none;
  outline: none;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.2);
}
.input-icon {
  position: absolute;
  top: 0;
  left: 18px;
  height: 48px;
  font-size: 24px;
  line-height: 48px;
  text-align: left;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}
  .swal2-confirm {
    color: #000000 !important; /* Establecer color negro solo para el texto de "Guardar" */
  }

.btn {
  border-radius: 4px;
  height: 44px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
  padding: 0 30px;
  letter-spacing: 1px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  align-items: center;
  background-color: #ffeba7;
  color: #000000;
}
.btn:hover {
  background-color: #2b2e38; /* Negro para el fondo */
  color: #ffeba7; /* Amarillo cálido para el texto */
  box-shadow: 0 8px 24px 0 rgba(16, 39, 112, 0.2); /* Sombra con un tono de azul */
}

      </style>
      <div class="form-group mt-2">
                <input 
                id="swal-input-url"
                  class="form-style"
                  placeholder="Ingrese la URL"
                  value="${recurso.url}"
                />
                <i style="color: #ffeba7" class="input-icon uil uil-link"></i>
              </div>
              <div class="form-group mt-2">
                <input
                id="swal-input-nombre"
                  class="form-style"
                  placeholder="Ingrese el nombre"
                   value="${recurso.nombre}"

                />
                <i style="color: #ffeba7" class="input-icon uil uil-label-alt"></i>
              </div>
               <div class="form-group mt-2">
                <textarea
                id="swal-input-descripcion"
                  class="form-style"
                  placeholder="Ingrese la descripción"
                >${recurso.descripcion}</textarea>
                <i
                  style="color: #ffeba7"
                  class="input-icon uil uil-wrap-text"
                ></i>
              </div>

   
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      confirmButtonColor: '#ffeba7',
      cancelButtonText: 'Cancelar',
      background: '#2b2e38',
      color: '#c4c3ca',
      preConfirm: () => {
        const recursoActualizado = {
          idRecurso: recurso.idRecurso,
          idCharla: this.idCharla,
          url: (document.getElementById('swal-input-url') as HTMLInputElement)
            .value,
          nombre: (
            document.getElementById('swal-input-nombre') as HTMLInputElement
          ).value,
          descripcion: (
            document.getElementById(
              'swal-input-descripcion'
            ) as HTMLTextAreaElement
          ).value,
        };
        console.log('Datos a enviar:', recursoActualizado);
        return recursoActualizado;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const recursoActualizado = result.value;

        this.charlasService.putRecurso(recursoActualizado).subscribe({
          next: () => {
            Swal.fire({
              title: 'Recurso actualizado',
              text: 'El recurso ha sido actualizado correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              background: '#2b2e38',
              color: '#c4c3ca',
            });

            const recursosActualizados = this.charlaDetalles.recursos.map((r) =>
              r.idRecurso === recursoActualizado.idRecurso
                ? recursoActualizado
                : r
            );

            this.charlaDetalles.recursos = recursosActualizados;
          },
          error: (err) => {
            console.error('Error al actualizar el recurso:', err);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo actualizar el recurso. Inténtalo de nuevo más tarde.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              background: '#2b2e38',
              color: '#c4c3ca',
            });
          },
        });
      }
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
          background: '#2b2e38',
          color: '#c4c3ca',
          confirmButtonColor: '#ffeba7', // Color de fondo del botón
          confirmButtonText: '<span style="color: #000;">ACEPTAR</span>',
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

  eliminarComentario(idComentario: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Eliminarás el comentario para siempre.',
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
        this.charlasService
          .deleteComentario(idComentario)
          .subscribe((response) => {
            Swal.fire({
              title: 'Comentario eliminado',
              text: 'El comentario se ha eliminado con éxito.',
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

            this.getCharlaDetalles();
          });
      }
    });
  }

  eliminarRecurso(idRecuso: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Eliminarás el recurso para siempre.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      background: '#2b2e38',
      color: '#c4c3ca',
      focusConfirm: false,
      buttonsStyling: false,
      didOpen: () => {
        const buttonsContainer = document.querySelector(
          '.swal2-actions'
        ) as HTMLElement;
        if (buttonsContainer) {
          buttonsContainer.style.display = 'flex';
          buttonsContainer.style.justifyContent = 'space-between';
          buttonsContainer.style.gap = '20px';
        }

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
        this.charlasService.deleteRecurso(idRecuso).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Recurso eliminado',
              text: 'El recurso se ha eliminado con éxito.',
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
              },
            });

            this.getCharlaDetalles();
          },
          error: (err) => {
            Swal.fire({
              title: 'Error',
              text: 'No se ha podido eliminar el recurso.',
              icon: 'error',
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
                  confirmButton.style.backgroundColor = '#ff4d4d';
                  confirmButton.style.color = '#ffffff';
                  confirmButton.style.padding = '10px 20px';
                  confirmButton.style.border = 'none';
                  confirmButton.style.borderRadius = '4px';
                  confirmButton.style.transition = 'all 0.3s ease';

                  confirmButton.addEventListener('mouseover', () => {
                    confirmButton.style.backgroundColor = '#ffffff';
                    confirmButton.style.color = '#ff4d4d';
                  });

                  confirmButton.addEventListener('mouseout', () => {
                    confirmButton.style.backgroundColor = '#ff4d4d';
                    confirmButton.style.color = '#ffffff';
                  });
                }
              },
            });
          },
        });
      }
    });
  }
}
