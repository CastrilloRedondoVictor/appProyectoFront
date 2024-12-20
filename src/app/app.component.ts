import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'appProyectoFront';
  @ViewChild(MatSidenav, { static: true })
  sidenav!: MatSidenav;

  showMenu = true; // Controla si se muestra el menú

  constructor(private router: Router, private observer: BreakpointObserver, private authService: AuthService) {}

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
      .pipe(filter(event => event instanceof NavigationEnd)) // Filtrar solo eventos de fin de navegación
      .subscribe(() => {
        // Actualizar el estado de showMenu según tus reglas
        this.showMenu = this.authService.isLogged();
      });
  }
}
