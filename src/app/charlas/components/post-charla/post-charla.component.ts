import { Component, OnInit } from '@angular/core';
import { Perfil } from '../../../models/alumno';
import { AuthService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-post-charla',
  standalone: false,

  templateUrl: './post-charla.component.html',
  styleUrls: ['./post-charla.component.css', '../../../app.component.css'],
})
export class PostCharlaComponent implements OnInit {
  fechaHoraHoy: string = '';
  public perfil!: Perfil;
  constructor(private _service: AuthService) {}

  ngOnInit(): void {
    const hoy = new Date();

    // Obtener la fecha y hora actual en formato YYYY-MM-DDTHH:MM
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
    const day = String(hoy.getDate()).padStart(2, '0');
    const hours = String(hoy.getHours()).padStart(2, '0');
    const minutes = String(hoy.getMinutes()).padStart(2, '0');

    this.fechaHoraHoy = `${year}-${month}-${day}T${hours}:${minutes}`;
    this._service.getPerfil().subscribe((response) => {
      this.perfil = response.usuario;
    });
  }
}
