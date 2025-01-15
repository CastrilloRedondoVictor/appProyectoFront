import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CharlaSin, Ronda } from '../../../models/charla';
import { CharlasService } from '../../../services/charlas-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Perfil } from '../../../models/alumno';
import { AuthService } from '../../../services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-charla',
  standalone: false,

  templateUrl: './post-charla.component.html',
  styleUrls: ['./post-charla.component.css', '../../../app.component.css', '../../../auth/components/login/login.component.css'],
})
export class PostCharlaComponent implements OnInit {
  @ViewChild('cajaTitulo') cajaTitulo!: ElementRef;
  @ViewChild('cajaDescripcion') cajaDescripcion!: ElementRef;
  @ViewChild('cajaTiempo') cajaTiempo!: ElementRef;

  public charla!: CharlaSin;
  public perfil!: Perfil;
  public ronda!: Ronda;

  tiempoIngresado!: number;
  errors: boolean[] = [false, false, false];
  errorTiempo: boolean = false;

  idRonda!: number;

  constructor(
    private _service: CharlasService,
    private _servicePerfil: AuthService,
    private _router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._servicePerfil.getPerfil().subscribe((response) => {
      this.perfil = response.usuario;
    });

    this.idRonda = Number(this.route.snapshot.paramMap.get('idRonda'));

    this._service.getRondasCurso().subscribe((response) => {
      this.ronda = response.filter((ronda: Ronda) => ronda.idRonda == this.idRonda)[0];
    });
  }

  adjustHeight(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto'; // Resetea la altura para recalcular
    textarea.style.height = textarea.scrollHeight + 'px'; // Ajusta la altura al contenido
  }

  validarTiempo(): void {
    if (this.tiempoIngresado > this.ronda.duracion) {
      this.errors[2] = true;
    } else{

      this.errors[2] = false;
    }
  }


  nuevaCharla(): void {
    var titulo = this.cajaTitulo.nativeElement.value;
    var descripcion = this.cajaDescripcion.nativeElement.value;
    var tiempo = this.cajaTiempo.nativeElement.value;

    this.charla = new CharlaSin(
      1,
      titulo,
      descripcion,
      tiempo,
      this.ronda.fechaPresentacion,
      this.perfil.idUsuario,
      1,
      this.idRonda,
      ''
    );

    this._service.postCharla(this.charla).subscribe((response) => {

      this._router.navigate(['charlas/charlasRonda/' + this.idRonda])

      Swal.fire({
        title: 'Charla creada',
        text: 'La charla se ha creado con éxito.',
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
