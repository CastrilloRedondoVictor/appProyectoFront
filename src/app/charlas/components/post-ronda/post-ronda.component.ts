import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Perfil } from '../../../models/alumno';
import { Ronda } from '../../../models/charla';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service.service';
import { CharlasService } from '../../../services/charlas-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-ronda',
  standalone: false,

  templateUrl: './post-ronda.component.html',
  styleUrls: [
    './post-ronda.component.css',
    '../../../app.component.css',
    '../../../auth/components/login/login.component.css',
  ],
})
export class PostRondaComponent implements OnInit {
  @ViewChild('cajaTitulo') cajaTitulo!: ElementRef;
  @ViewChild('cajaTiempo') cajaTiempo!: ElementRef;
  @ViewChild('fechaPresentacion') fechaPresentacion!: ElementRef;
  @ViewChild('fechaVotacion') fechaVotacion!: ElementRef;
  @ViewChild('fechaCierre') fechaCierre!: ElementRef;

  public perfil!: Perfil;
  public ronda!: Ronda;

  constructor(
    private _service: CharlasService,
    private _servicePerfil: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._servicePerfil.getPerfil().subscribe((response) => {
      this.perfil = response.usuario;
    });
  }

  nuevaRonda() {
    var titulo = this.cajaTitulo.nativeElement.value;
    var tiempo = this.cajaTiempo.nativeElement.value;
    var txtfechaPresentacion = this.fechaPresentacion.nativeElement.value;
    var txtfechaVotacion = this.fechaVotacion.nativeElement.value;
    var txtfechaCierre = this.fechaCierre.nativeElement.value;

    this.ronda = new Ronda(
      1,
      1,
      txtfechaPresentacion,
      txtfechaCierre,
      tiempo,
      titulo,
      txtfechaVotacion
    );

    this._service.postRonda(this.ronda).subscribe((response) => {
      this._router.navigate(['/']);

      Swal.fire({
        title: 'Ronda creada',
        text: 'La ronda se ha creado con éxito.',
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
      });
    });
  }
}
