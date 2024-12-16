import { Component, OnInit } from '@angular/core';
import { Ronda } from '../../../models/charla';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth-service.service';
import { CharlasService } from '../../../services/charlas-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,

  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../../app.component.css']
})
export class DashboardComponent implements OnInit {

  public rondas!: Ronda[];


  constructor(
    private charlasService: CharlasService
  ){}


  ngOnInit(): void {
    this.charlasService.getRondasCurso().subscribe((response: Ronda[]) => {
      this.rondas = response;
    });
  }

}
