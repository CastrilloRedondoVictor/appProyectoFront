import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


interface SidenavToggle {
  screenwidth: number;
  collapsed: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'appProyectoFront';

  showMenu = true; // Controla si se muestra el menú

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      // Verifica si la URL contiene "auth"
      this.showMenu = !this.router.url.startsWith('/auth');
    });
  }

  isSideNavCollapsed = false;
  screenWidth = 0;


  onToggleSideNav(event: SidenavToggle): void {
    console.log(event)
    this.screenWidth = event.screenwidth;
    this.isSideNavCollapsed = event.collapsed
  }
}
