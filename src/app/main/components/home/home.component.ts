import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../app.component.css'],
})
export class HomeComponent {
  currentMonth: Date;

  constructor() {
    this.currentMonth = new Date();
  }

  navigatePrevious(): void {
    this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth() - 1));
  }

  navigateNext(): void {
    this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth() + 1));
  }
}
