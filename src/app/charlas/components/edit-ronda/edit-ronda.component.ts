import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CharlasService } from '../../../services/charlas-service.service';
import { AuthService } from '../../../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ronda } from '../../../models/charla';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-ronda',
  standalone: false,

  templateUrl: './edit-ronda.component.html',
  styleUrls: [
    './edit-ronda.component.css',
    '../../../app.component.css',
    '../../../auth/components/login/login.component.css',
  ],
})
export class EditRondaComponent implements OnInit {
  @ViewChild('cajaTitulo') cajaTitulo!: ElementRef;
  @ViewChild('cajaTiempo') cajaTiempo!: ElementRef;
  @ViewChild('fechaPresentacion') fechaPresentacion!: ElementRef;
  @ViewChild('fechaVotacion') fechaVotacion!: ElementRef;
  @ViewChild('fechaCierre') fechaCierre!: ElementRef;

  idRonda!: number;
  public ronda!: Ronda;

  constructor(
    private _service: CharlasService,
    private _servicePerfil: AuthService,
    private _router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idRonda = Number(this.route.snapshot.paramMap.get('idRonda'));

    this._service.getRondaById(this.idRonda).subscribe((response) => {
      this.ronda = response;

      this.ronda.fechaPresentacion = this.formatDate(
        this.ronda.fechaPresentacion
      );
      this.ronda.fechaLimiteVotacion = this.formatDate(
        this.ronda.fechaLimiteVotacion
      );
      this.ronda.fechaCierre = this.formatDate(this.ronda.fechaCierre);
      // console.log(this.ronda);
    });
  }

  private formatDate(dateString: string): string {
    return dateString ? dateString.split('T')[0] : '';
  }

  editarRonda(): void {
    var titulo = this.cajaTitulo.nativeElement.value;
    var tiempo = this.cajaTiempo.nativeElement.value;
    var fechaPresentacion = this.fechaPresentacion.nativeElement.value;
    var fechaVotacion = this.fechaVotacion.nativeElement.value;
    var fechaCierre = this.fechaCierre.nativeElement.value;

    this.ronda.idRonda = this.idRonda;
    this.ronda.idCursoUsuario = this.ronda.idCursoUsuario;
    this.ronda.fechaPresentacion = fechaPresentacion;
    this.ronda.fechaCierre = fechaCierre;
    this.ronda.duracion = tiempo;
    this.ronda.descripcionModulo = titulo;
    this.ronda.fechaLimiteVotacion = fechaVotacion;

    this._service.putRonda(this.ronda).subscribe(
      (response) => {
        Swal.fire({
          title: 'Ronda editada',
          text: 'La ronda se ha editado con éxito.',
          icon: 'success',
          confirmButtonText: 'ACEPTAR',
          background: '#2b2e38',
          color: '#c4c3ca',
          focusConfirm: false,
          buttonsStyling: false,
          didOpen: () => {
            // Estilizar contenedor de botones
            const buttonsContainer = document.querySelector('.swal2-actions') as HTMLElement;
            if (buttonsContainer) {
              buttonsContainer.style.display = 'flex';
              buttonsContainer.style.justifyContent = 'space-between';
              buttonsContainer.style.gap = '20px'; // Espaciado entre botones
            }

            // Botón de confirmar
            const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
            if (confirmButton) {
              confirmButton.style.backgroundColor = '#ffeba7';
              confirmButton.style.color = '#2b2e38';
              confirmButton.style.padding = '10px 20px';
              confirmButton.style.border = 'none';
              confirmButton.style.borderRadius = '4px';
              confirmButton.style.transition = 'all 0.3s ease';

              confirmButton.addEventListener('mouseover', () => {
                confirmButton.style.backgroundColor = '#1f2029';
                confirmButton.style.color = '#ffeba7';
              });

              confirmButton.addEventListener('mouseout', () => {
                confirmButton.style.backgroundColor = '#ffeba7';
                confirmButton.style.color = '#2b2e38';
              });
            }

            // Botón de cancelar
            const cancelButton = document.querySelector('.swal2-cancel') as HTMLElement;
            if (cancelButton) {
              cancelButton.style.backgroundColor = '#e74c3c';
              cancelButton.style.color = '#ffffff';
              cancelButton.style.padding = '10px 20px';
              cancelButton.style.border = 'none';
              cancelButton.style.borderRadius = '4px';
              cancelButton.style.transition = 'all 0.3s ease';

              cancelButton.addEventListener('mouseover', () => {
                cancelButton.style.backgroundColor = '#a93226';
              });

              cancelButton.addEventListener('mouseout', () => {
                cancelButton.style.backgroundColor = '#e74c3c';
                cancelButton.style.color = '#ffffff';
              });
            }
          },
        }).then(() => {
          this._router.navigate(['/charlas']);
        });
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'No se ha podido editar la ronda',
          icon: 'error',
          confirmButtonText: 'ACEPTAR',
          background: '#2b2e38',
          color: '#c4c3ca',
          focusConfirm: false,
          buttonsStyling: false,
          didOpen: () => {
            // Estilizar contenedor de botones
            const buttonsContainer = document.querySelector('.swal2-actions') as HTMLElement;
            if (buttonsContainer) {
              buttonsContainer.style.display = 'flex';
              buttonsContainer.style.justifyContent = 'space-between';
              buttonsContainer.style.gap = '20px'; // Espaciado entre botones
            }

            // Botón de confirmar
            const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
            if (confirmButton) {
              confirmButton.style.backgroundColor = '#ffeba7';
              confirmButton.style.color = '#2b2e38';
              confirmButton.style.padding = '10px 20px';
              confirmButton.style.border = 'none';
              confirmButton.style.borderRadius = '4px';
              confirmButton.style.transition = 'all 0.3s ease';

              confirmButton.addEventListener('mouseover', () => {
                confirmButton.style.backgroundColor = '#1f2029';
                confirmButton.style.color = '#ffeba7';
              });

              confirmButton.addEventListener('mouseout', () => {
                confirmButton.style.backgroundColor = '#ffeba7';
                confirmButton.style.color = '#2b2e38';
              });
            }

            // Botón de cancelar
            const cancelButton = document.querySelector('.swal2-cancel') as HTMLElement;
            if (cancelButton) {
              cancelButton.style.backgroundColor = '#e74c3c';
              cancelButton.style.color = '#ffffff';
              cancelButton.style.padding = '10px 20px';
              cancelButton.style.border = 'none';
              cancelButton.style.borderRadius = '4px';
              cancelButton.style.transition = 'all 0.3s ease';

              cancelButton.addEventListener('mouseover', () => {
                cancelButton.style.backgroundColor = '#a93226';
              });

              cancelButton.addEventListener('mouseout', () => {
                cancelButton.style.backgroundColor = '#e74c3c';
                cancelButton.style.color = '#ffffff';
              });
            }
          },
        });
      }
    );
  }
}
