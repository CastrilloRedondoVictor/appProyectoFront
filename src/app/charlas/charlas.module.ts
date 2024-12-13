import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostCharlaComponent } from './components/post-charla/post-charla.component';
import { CharlasRoutingModule } from './charlas-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    PostCharlaComponent
  ],
  imports: [CommonModule, CharlasRoutingModule, FormsModule],
})
export class CharlasModule {}
