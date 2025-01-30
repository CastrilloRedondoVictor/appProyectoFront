import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth-service.service';
import { Perfil } from './models/perfil';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'appProyectoFront';
  @ViewChild(MatSidenav, { static: true })
  sidenav!: MatSidenav;

  showMenu = true;

  perfil!: Perfil;
  message: string = 'BIENVENID@, INVITAD@';
  rolUsuario!: string | null;

  constructor(
    private router: Router,
    private observer: BreakpointObserver,
    private authService: AuthService
  ) {}

  logOut() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Cerrar sesión',
      cancelButtonText: 'Cancelar',
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
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('authToken');
        this.router.navigate(['/auth']);
      } else {
        console.log('Cancelado');
      }
    });

  }

  ngOnInit(): void {
    // Inicializar showMenu según el estado de autenticación
    this.showMenu = this.authService.isLogged();

    // Detectar cambios en el tamaño de la pantalla
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });

    // Escuchar eventos de navegación para actualizar el estado de showMenu
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd)) // Filtrar solo eventos de fin de navegación
      .subscribe(() => {
        // Actualizar el estado de showMenu según tus reglas
        this.showMenu = this.authService.isLogged();
        if (this.showMenu) {
          this.rolUsuario = this.authService.getRolUsuario();
          this.authService.getPerfil().subscribe((perfil) => {
            this.perfil = perfil;
            this.message = 'BIENVENID@, ' + this.perfil.usuario.nombre.toUpperCase();
          });
        }
      });
  }
}
