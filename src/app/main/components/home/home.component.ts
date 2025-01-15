import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CharlasService } from '../../../services/charlas-service.service';
import { Ronda } from '../../../models/charla';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../app.component.css'],
})
export class HomeComponent implements OnInit {

  public rondas!: Ronda[];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin], // Plugin necesario para la vista dayGridMonth
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'today', // Botón "today"
      center: 'title', // Título centrado
      right: 'prev,next', // Botones prev y next,
    },
    events: [] // Inicialmente vacío
  };

  constructor(private charlasService: CharlasService) {}

  ngOnInit(): void {
    this.charlasService.getRondasCurso().subscribe((response: Ronda[]) => {
      const events = response.map((ronda: Ronda) => {
        const localDate = new Date(ronda.fechaPresentacion);
        const formattedDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000)
          .toISOString()
          .split('T')[0]; // Ajusta la fecha y elimina la parte de tiempo
        return {
          title: ronda.descripcionModulo,
          date: formattedDate, // Usa la fecha ajustada
          color: '#2b2e38',
          textColor: '#ffeba7',
        };
      });

      // Asigna los eventos al calendario
      this.calendarOptions = {
        ...this.calendarOptions, // Mantén las opciones actuales
        events, // Actualiza los eventos
      };
      console.log(this.calendarOptions.events); // Verifica los eventos en consola
    });
  }

}
