import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'appProyectoFront';
  @ViewChild(MatSidenav, { static: true })
  sidenav!: MatSidenav;

  showMenu = true; // Controla si se muestra el menú

  constructor(private router: Router, private observer: BreakpointObserver) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      // Verifica si la URL contiene "auth"
      this.showMenu = !this.router.url.startsWith('/auth');
    });
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
}
