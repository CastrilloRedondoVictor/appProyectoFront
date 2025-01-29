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
    });
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
