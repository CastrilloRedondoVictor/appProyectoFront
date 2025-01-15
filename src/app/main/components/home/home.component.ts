import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // Asegúrate de tener instalado este plugin

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../app.component.css'],
})
export class HomeComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin], // Plugin necesario para la vista dayGridMonth
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'today', // Botón "today"
      center: 'title', // Título centrado
      right: 'prev,next', // Botones prev y next,
    },
    events: [
      { title: 'Evento 1', date: '2025-01-07', color: '#2b2e38', textColor: '#ffeba7' },
      { title: 'Evento 2', date: '2025-01-10', color: '#2b2e38', textColor: '#ffeba7' },
    ], // Ejemplo de eventos
  };
}
