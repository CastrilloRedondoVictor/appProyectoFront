import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  collapsed = true;
  navData = [
    {
      routeLink: '',
      icon: 'fa fa-home',
      label: 'Home'
    }
  ]
}
