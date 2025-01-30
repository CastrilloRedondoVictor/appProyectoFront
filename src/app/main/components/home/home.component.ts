import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CharlasService } from '../../../services/charlas-service.service';
import { Ronda } from '../../../models/charla';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service.service';
import esLocale from '@fullcalendar/core/locales/es';  // Importa el idioma español


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../app.component.css'],
})
export class HomeComponent implements OnInit {
  public rondas!: Ronda[];
  public rolUsuario!: string | null;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin], // Plugin necesario para la vista dayGridMonth
    initialView: 'dayGridMonth',
    locale: 'es',
    firstDay: 1,
    headerToolbar: {
      left: 'today', // Botón "today"
      center: 'title', // Título centrado
      right: 'prev,next', // Botones prev y next,
    },
    buttonText: {
      today: 'Hoy', // Cambia el texto de 'today' a 'Hoy'
    },
    events: [], // Inicialmente vacío
    eventClick: this.handleEventClick.bind(this), // Asigna el manejador de clic
  };

  constructor(private charlasService: CharlasService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {


    this.rolUsuario = this.authService.getRolUsuario();
    if (this.rolUsuario == '3') {
      this.charlasService.getRondasAdmin().subscribe((response: Ronda[]) => {
        const events = response.map((ronda: Ronda) => {
          const localDate = new Date(ronda.fechaPresentacion);
          const formattedDate = new Date(
            localDate.getTime() - localDate.getTimezoneOffset() * 60000
          )
            .toISOString()
            .split('T')[0]; // Ajusta la fecha y elimina la parte de tiempo
          return {
            id: String(ronda.idRonda),
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
          eventDidMount: (info) => {
            info.el.style.cursor = 'pointer'; // Aplica el cursor pointer
          }
        };
      });
    } else {
      this.charlasService.getRondasCurso().subscribe((response: Ronda[]) => {
        const events = response.map((ronda: Ronda) => {
          const localDate = new Date(ronda.fechaPresentacion);
          const formattedDate = new Date(
            localDate.getTime() - localDate.getTimezoneOffset() * 60000
          )
            .toISOString()
            .split('T')[0]; // Ajusta la fecha y elimina la parte de tiempo
          return {
            id: String(ronda.idRonda),
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
          eventDidMount: (info) => {
            info.el.style.cursor = 'pointer'; // Aplica el cursor pointer
          }
        };
      });
    }
  }

  handleEventClick(arg: any): void {
    const eventId = arg.event.id; // Obtiene el ID del evento clicado
    if (eventId) {
      this.router.navigate(['charlas/charlasRonda', eventId]); // Navega a la ruta con el ID
      // console.log('Entra aqii' + eventId);
    }
  }
}
