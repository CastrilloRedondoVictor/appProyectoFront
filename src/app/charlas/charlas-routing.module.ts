import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostCharlaComponent } from './components/post-charla/post-charla.component';
import { CharlasRondaComponent } from './components/charlas-ronda/charlas-ronda.component';
import { PostRondaComponent } from './components/post-ronda/post-ronda.component';
import { DetallesCharlaComponent } from './components/detalles-charla/detalles-charla.component';

const routes: Routes = [
  { path: 'charlasRonda/new/:idRonda', component: PostCharlaComponent },
  { path: 'charlasRonda/newRonda', component: PostRondaComponent },
  { path: 'charlasRonda/detallesCharla', component: DetallesCharlaComponent },
  { path: 'charlasRonda/:idRonda', component: CharlasRondaComponent },
  { path: '', component: DashboardComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharlasRoutingModule {}
