import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostCharlaComponent } from './components/post-charla/post-charla.component';
import { CharlasRoutingModule } from './charlas-routing.module';
import { FormsModule } from '@angular/forms';
import { CharlasRondaComponent } from './components/charlas-ronda/charlas-ronda.component';
import { PostRondaComponent } from './components/post-ronda/post-ronda.component';
import { DetallesCharlaComponent } from './components/detalles-charla/detalles-charla.component';
import {PostComentarioComponent} from './components/post-comentario/post-comentario.component';
import { EditCharlaComponent } from './components/edit-charla/edit-charla.component';
import { NewCursoComponent } from './components/new-curso/new-curso.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PostCharlaComponent,
    CharlasRondaComponent,
    PostRondaComponent,
    DetallesCharlaComponent,
    PostComentarioComponent,
    EditCharlaComponent,
    NewCursoComponent
  ],
  imports: [CommonModule, CharlasRoutingModule, FormsModule],
})
export class CharlasModule {}
