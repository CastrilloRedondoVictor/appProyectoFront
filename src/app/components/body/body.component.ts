import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  standalone: false,

  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent implements OnInit {
  showMenu = true; // Controla si se muestra el menú

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      // Verifica si la URL contiene "auth"
      this.showMenu = !this.router.url.startsWith('/auth');
    });
  }

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (
      this.collapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}
