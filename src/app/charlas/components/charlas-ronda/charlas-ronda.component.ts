import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Charla, Ronda } from '../../../models/charla';
import { CharlasService } from '../../../services/charlas-service.service';
import { Voto } from '../../../models/voto';
import Swal from 'sweetalert2';
import { Perfil } from '../../../models/alumno';
import { AuthService } from '../../../services/auth-service.service';
import { EstadoCharla } from '../../../models/estadoCharla';

@Component({
  selector: 'app-charlas-ronda',
  standalone: false,

  templateUrl: './charlas-ronda.component.html',
  styleUrls: ['./charlas-ronda.component.css', '../../../app.component.css'],
})
export class CharlasRondaComponent implements OnInit {
  idRonda!: number;
  charlasRonda!: Charla[];
  charlasAlumno!: any[];
  hasCharla!: boolean;
  hasVoted!: boolean;
  canAddCharla!: boolean;
  hasChosenVote!: boolean;
  voto!: Voto;
  public perfil!: Perfil;
  ronda!: Ronda;
  estadosCharla!: EstadoCharla[];
  selectedEstadoCharla = '';
  votosCharla: { [key: number]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private charlasService: CharlasService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.idRonda = Number(this.route.snapshot.paramMap.get('idRonda'));
    this.getCharlas();

    this.charlasService.getRonda(this.idRonda).subscribe((response) => {
      this.ronda = response;
      this.canVote();
      this.canAdd();
    });

    this.authService.getPerfil().subscribe((response) => {
      this.perfil = response.usuario;
    });

    this.getEstadosCharlas(); // Llamada para cargar los estados

    this.route.paramMap.subscribe((params) => {
      this.idRonda = Number(params.get('idRonda'));
      this.getCharlas();
      this.canVote();
      this.canAdd();
    });
  }

  getCharlas() {
    // Si no se selecciona ningún estado, se cargan todas las charlas.
    if (!this.selectedEstadoCharla) {
      this.charlasService
        .getCharlasRonda(this.idRonda)
        .subscribe((response: Charla[]) => {
          this.charlasRonda = response;
          for(let i = 0; i < this.charlasRonda.length; i++) {
            this.charlasService.getVotosCharla(this.charlasRonda[i].idCharla).subscribe((response) => {
              console.log(response.votos)
              this.votosCharla[i] = response.votos;
            });
          }
        });
    } else {
      // Filtrar las charlas según el estado seleccionado
      const estadoId = this.selectedEstadoCharla === 'PROPUESTA' ? 1 : 2;
      this.charlasService
        .getCharlasRondaEstado(this.idRonda, estadoId)
        .subscribe((response: Charla[]) => {
          this.charlasRonda = response;
        });
    }

    if (localStorage.getItem('idRole') != '2') {
      this.hasCharla = true;
      return;
    }

    this.charlasService.getCharlasAlumno().subscribe((response) => {
      this.charlasAlumno = response;
      for (let charla of this.charlasAlumno) {
        if (charla.charla.idRonda == this.idRonda) {
          this.hasCharla = true;
          return;
        }
      }
      this.hasCharla = false;
    });
  }

  getEstadosCharlas(): void {
    this.charlasService.getEstadosCharlas().subscribe((response) => {
      this.estadosCharla = response; // Asignamos la respuesta a la variable
    });
  }

  canAdd() {
    const today = new Date();
    const closingDate = new Date(this.ronda.fechaCierre);

    closingDate < today || this.authService.getRolUsuario() != '2'
      ? (this.canAddCharla = false)
      : (this.canAddCharla = true);
  }

  canVote(): void {
    const today = new Date();
    const votingDate = new Date(this.ronda.fechaLimiteVotacion);
    const closingDate = new Date(this.ronda.fechaCierre);

    votingDate < today || closingDate >= today || this.authService.getRolUsuario() != '2'
      ? (this.hasVoted = true)
      : (this.hasVoted = false);

    if (this.hasVoted) {
      return;
    }

    this.charlasService
      .getVotosRondaAlumno(this.idRonda)
      .subscribe((response: Voto) => {
        this.voto = response;
        this.hasVoted = !!this.voto.idVoto;
        this.hasChosenVote = false;
      });
  }

  getVotosCharla(idCharla: number) {
    this.charlasService.getVotosCharla(idCharla).subscribe((response) => {
      console.log(idCharla)
      console.log("Charla " + idCharla + " " + response);
      this.votosCharla[idCharla] = response;
    });
  }

  getHoras(tiempo: number): number {
    return Math.floor(tiempo / 60);
  }

  votarCharla(charla: Charla, id: number): void {
    if (!this.hasChosenVote) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres votar a esta charla?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Votar',
        cancelButtonText: 'Cancelar',
        background: '#2b2e38',
        color: '#c4c3ca',
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
          this.voto = new Voto(
            1,
            charla.idCharla,
            this.perfil.idUsuario,
            this.idRonda
          );
          this.charlasService.postVoto(this.voto).subscribe((response) => {
            this.hasVoted = true;
          });
          Swal.fire({
            title: 'Voto realizado',
            text: 'Has votado en esta charla con éxito.',
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
        } else {
          const chkVote = document.getElementById(
            'chkVote' + id.toString()
          ) as HTMLInputElement;
          if (chkVote) {
            chkVote.click();
          }
        }
      });
    }
    this.hasChosenVote = !this.hasChosenVote;
  }

  eliminarCharla(idRonda: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Eliminarás la charla para siempre.',
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
        this.charlasService.deleteCharla(idRonda).subscribe((response) => {
          Swal.fire({
            title: 'Charla eliminada',
            text: 'La charla se ha eliminado con éxito.',
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

          this.getCharlas();
        }, (error:any) => {
                      Swal.fire({
                        title: 'Error al eliminar la ronda',
                        text: 'No se ha podido eliminar la ronda',
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

  onEstadoChange(): void {
    this.getCharlas(); // Recargar las charlas basadas en el estado seleccionado.
  }

  cambiarEstadoCharla(charla: Charla): void {
    const nuevoEstado = charla.estadoCharla === 'PROPUESTA' ? 2 : 1;
    this.charlasService
      .updateEstadoCharla(charla.idCharla, nuevoEstado)
      .subscribe(
        (response) => {
          charla.estadoCharla = nuevoEstado === 1 ? 'PROPUESTA' : 'ACEPTADA'; // Actualizamos el estado localmente.
          Swal.fire({
            title: 'Estado actualizado',
            text: `El estado de la charla ha sido cambiado a ${
              nuevoEstado === 1 ? 'PROPUESTA' : 'ACEPTADA'
            }.`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            background: '#2b2e38',
            color: '#c4c3ca',
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
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo actualizar el estado de la charla.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            background: '#2b2e38',
            color: '#c4c3ca',
          });
        }
      );
  }
}
