import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Charla } from '../../../models/charla';
import { CharlasService } from '../../../services/charlas-service.service';

@Component({
  selector: 'app-charlas-ronda',
  standalone: false,

  templateUrl: './charlas-ronda.component.html',
  styleUrls: ['./charlas-ronda.component.css', '../../../app.component.css'],
})
export class CharlasRondaComponent implements OnInit {
  idRonda!: number;
  charlasRonda!: Charla[];
  charlasAlumno!: any[];
  hasCharla!: boolean;

  constructor(
    private route: ActivatedRoute,
    private charlasService: CharlasService
  ) {}

  ngOnInit(): void {
    this.idRonda = Number(this.route.snapshot.paramMap.get('idRonda'));
    this.getCharlas();

    this.route.paramMap.subscribe((params) => {
      this.idRonda = Number(params.get('idRonda'));
      this.getCharlas();
    });
  }

  getCharlas() {
    this.charlasService
      .getCharlasRonda(this.idRonda)
      .subscribe((response: Charla[]) => {
        this.charlasRonda = response;
      });

    if (localStorage.getItem('idRole') != '2') {
      this.hasCharla = true;
      return;
    }

    this.charlasService.getCharlasAlumno().subscribe((response) => {
      this.charlasAlumno = response;
      for (let charla of this.charlasAlumno) {
        if (charla.charla.idRonda == this.idRonda) {
          this.hasCharla = true;
          return;
        }
      }
      this.hasCharla = false;
    });
  }
}
