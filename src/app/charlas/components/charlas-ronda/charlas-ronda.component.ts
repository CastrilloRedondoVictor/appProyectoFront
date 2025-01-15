import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Charla, Ronda } from '../../../models/charla';
import { CharlasService } from '../../../services/charlas-service.service';
import { Voto } from '../../../models/voto';
import Swal from 'sweetalert2';
import { Perfil } from '../../../models/alumno';
import { AuthService } from '../../../services/auth-service.service';

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
  hasChosenVote!: boolean;
  voto!: Voto;
  perfil!: Perfil;
  ronda!: Ronda;

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
    });

    this.authService.getPerfil().subscribe((response) => {
      this.perfil = response.usuario;
    });

    this.route.paramMap.subscribe((params) => {
      this.idRonda = Number(params.get('idRonda'));
      this.getCharlas();
      this.canVote();
    });
  }

  getCharlas() {
    this.charlasService
      .getCharlasRonda(this.idRonda)
      .subscribe((response: Charla[]) => {
        this.charlasRonda = response;
      });

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

  canVote(): void {

    const today = new Date();
    const votingDate = new Date(this.ronda.fechaLimiteVotacion);

    // Compara solo el año, mes y día
    const isToday =
      today.getFullYear() === votingDate.getFullYear() &&
      today.getMonth() === votingDate.getMonth() &&
      today.getDate() === votingDate.getDate();

    if (!isToday) {
      this.hasVoted = true;
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
              confirmButton.style.backgroundColor = '#000000';
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
          this.voto = new Voto(1, charla.idCharla, this.perfil.idUsuario, this.idRonda)
          this.charlasService
          .postVoto(this.voto)
          .subscribe(response => {
            this.hasVoted = true;
          })
        } else {
          const chkVote = document.getElementById('chkVote' + id.toString()) as HTMLInputElement;
          if (chkVote) {
            chkVote.click();
          }
        }
      });
    }
    this.hasChosenVote = !this.hasChosenVote;
  }
}
