import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostCharlaComponent } from './components/post-charla/post-charla.component';
import { CharlasRoutingModule } from './charlas-routing.module';
import { FormsModule } from '@angular/forms';
import { CharlasRondaComponent } from './components/charlas-ronda/charlas-ronda.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PostCharlaComponent,
    CharlasRondaComponent
  ],
  imports: [CommonModule, CharlasRoutingModule, FormsModule],
})
export class CharlasModule {}
