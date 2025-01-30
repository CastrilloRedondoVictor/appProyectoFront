import { Component, OnInit } from '@angular/core';
import { Ronda } from '../../../models/charla';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth-service.service';
import { CharlasService } from '../../../services/charlas-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  standalone: false,

  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../../app.component.css']
})
export class DashboardComponent implements OnInit {

  public rondas!: Ronda[];
  public rolUsuario!: string | null;


  constructor(
    private charlasService: CharlasService,
    private authService: AuthService,
  ){}


  ngOnInit(): void {
    this.rolUsuario = this.authService.getRolUsuario();
    this.getRondas();
  }

  getHoras(tiempo: number): number {
    return Math.floor(tiempo / 60);
  }

  eliminarRonda(idRonda: number){

    Swal.fire({
          title: '¿Estás seguro?',
          text: 'Eliminarás la ronda y todas sus charlas.',
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
            this.charlasService.deleteRonda(idRonda).subscribe((response) => {
              Swal.fire({
                      title: 'Ronda eliminada',
                      text: 'La ronda se ha eliminado con éxito.',
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
              this.getRondas();
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
        }
      );


  }

  getRondas() {

    if(this.rolUsuario == '3'){
      this.charlasService.getRondasAdmin().subscribe((response: Ronda[]) => {
        this.rondas = response;
      });
    } else{
      this.charlasService.getRondasCurso().subscribe((response: Ronda[]) => {
        this.rondas = response;
      });
      this.rolUsuario = this.authService.getRolUsuario()

      if (this.rolUsuario == '1') {
        this.charlasService.getRondasProfesor().subscribe((response: Ronda[]) => {
          this.rondas = response;
        });
      }
    }
  }

}
