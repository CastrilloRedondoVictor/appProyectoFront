import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

interface SidenavToggle {
  screenwidth: number;
  collapsed: boolean
}
@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('250ms',
          style({opacity: 0})
        )
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('500ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(0.5turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class MenuComponent implements OnInit {

  @Output() onToggleSidenav: EventEmitter<SidenavToggle> = new EventEmitter<SidenavToggle>()
  collapsed = true;
  screenWidth = 0;
  navData = [
    {
      routeLink: '',
      icon: 'fa fa-home',
      label: 'Home'
    },
    {
      routeLink: 'profile',
      icon: 'fa fa-user',
      label: 'Profile'
    },
  ]

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleSidenav.emit({screenwidth: this.screenWidth, collapsed: this.collapsed})
    }
  }


  ngOnInit(): void {
    this.screenWidth = window.innerWidth
  }



  toggleCollapse(): void {
    this.collapsed = !this.collapsed
    this.onToggleSidenav.emit({screenwidth: this.screenWidth, collapsed: this.collapsed})
  }

  closeSidenav(): void {
    this.collapsed = false
    this.onToggleSidenav.emit({screenwidth: this.screenWidth, collapsed: this.collapsed})
  }
}
