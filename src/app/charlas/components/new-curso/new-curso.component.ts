import { Component, ElementRef, ViewChild } from '@angular/core';
import { Curso } from '../../../models/curso';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CharlasService } from '../../../services/charlas-service.service';

@Component({
  selector: 'app-new-curso',
  standalone: false,

  templateUrl: './new-curso.component.html',
  styleUrls: ['./new-curso.component.css', '../post-ronda/post-ronda.component.css',
    '../../../app.component.css',
    '../../../auth/components/login/login.component.css',]
})
export class NewCursoComponent {

    @ViewChild('codigoCurso') cajaCodigoCurso!: ElementRef;
    @ViewChild('cajaNombre') cajaNombre!: ElementRef;
    @ViewChild('fechaInicio') cajaFechaInicio!: ElementRef;
    @ViewChild('fechaFin') cajaFechaFin!: ElementRef;

    public curso!: Curso;

    constructor(
      private _service: CharlasService,
      private _router: Router
    ) {}

    nuevoCurso() {
      var codigoCurso = this.cajaCodigoCurso.nativeElement.value;
      var nombre = this.cajaNombre.nativeElement.value;
      var fechaInicio = this.cajaFechaInicio.nativeElement.value;
      var fechaFin = this.cajaFechaFin.nativeElement.value;

      this.curso = new Curso(
        codigoCurso,
        nombre,
        fechaInicio,
        fechaFin,
        true
      );

      this._service.postCurso(this.curso).subscribe((response) => {
        this._router.navigate(['/']);

        Swal.fire({
          title: 'Curso creado',
          text: 'El curso se ha creado con éxito.',
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
      });
    }
}
