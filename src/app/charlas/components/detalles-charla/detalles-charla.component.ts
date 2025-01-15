import { Component, OnInit } from '@angular/core';
import { Charla } from '../../../models/charla';
import { ActivatedRoute } from '@angular/router';
import { CharlasService } from '../../../services/charlas-service.service';
import { CharlaDetalles } from '../../../models/charlaDetalles';

@Component({
  selector: 'app-detalles-charla',
  standalone: false,

  templateUrl: './detalles-charla.component.html',
  styleUrls: ['./detalles-charla.component.css', '../../../app.component.css'],
})
export class DetallesCharlaComponent implements OnInit {
  idCharla!: number;
  charlasRonda!: Charla[];
  charlaDetalles!: CharlaDetalles;
  idRonda!: number;

  constructor(
    private route: ActivatedRoute,
    private charlasService: CharlasService
  ) {}

  ngOnInit(): void {
    // Obtener ID de ronda y charla desde los parámetros de la ruta
    this.idRonda = Number(this.route.snapshot.paramMap.get('idRonda'));
    this.idCharla = Number(this.route.snapshot.paramMap.get('idCharla'));

    // Cargar las charlas de la ronda y los detalles de la charla específica
    this.getCharlaDetalles();

    // Suscribirse a los cambios en los parámetros de la ruta
    this.route.paramMap.subscribe((params) => {
      this.idRonda = Number(params.get('idRonda'));
      this.idCharla = Number(params.get('idCharla'));
      this.getCharlaDetalles();
    });
  }

  getCharlaDetalles(): void {
    this.charlasService.getCharlaById(this.idCharla).subscribe({
      next: (response: CharlaDetalles) => {
        this.charlaDetalles = response;
        console.log(this.charlaDetalles);
      },
      error: (err) => {
        console.error('Error al obtener detalles de la charla:', err);
      },
    });
  }

  getHoras(tiempo: number): number {
    return Math.floor(tiempo / 60);
  }
}
