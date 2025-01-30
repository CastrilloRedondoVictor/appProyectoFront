import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostCharlaComponent } from './components/post-charla/post-charla.component';
import { CharlasRondaComponent } from './components/charlas-ronda/charlas-ronda.component';
import { PostRondaComponent } from './components/post-ronda/post-ronda.component';
import { DetallesCharlaComponent } from './components/detalles-charla/detalles-charla.component';
import { PostComentarioComponent } from './components/post-comentario/post-comentario.component';
import { EditCharlaComponent } from './components/edit-charla/edit-charla.component';
import { EditRondaComponent } from './components/edit-ronda/edit-ronda.component';
import { NewCursoComponent } from './components/new-curso/new-curso.component';


const routes: Routes = [
  { path: 'charlasRonda/new/:idRonda', component: PostCharlaComponent },
  { path: 'charlasRonda/newRonda', component: PostRondaComponent },

  { path: 'cursos/new', component: NewCursoComponent },
  {
    path: 'charlasRonda/detallesCharla/:idRonda/:idCharla',
    component: DetallesCharlaComponent,
  },
  {
    path: 'charlasRonda/edit/:idRonda/:idCharla',
    component: EditCharlaComponent,
  },
  {
    path: 'charlasRonda/editRonda/:idRonda',
    component: EditRondaComponent,
  },
  { path: 'charlasRonda/:idRonda', component: CharlasRondaComponent },
  {
    path: 'charlasRonda/newComentario/:idRonda/:idCharla',
    component: PostComentarioComponent,
  },
  { path: '', component: DashboardComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharlasRoutingModule { }
