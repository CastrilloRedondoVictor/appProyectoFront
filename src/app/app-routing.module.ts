import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule), // Lazy load AuthModule
    canActivate: [AuthGuard]
  },
  {
    path: 'charlas',
    loadChildren: () => import('./charlas/charlas.module').then((m) => m.CharlasModule), // Lazy load CharlasModule
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule), // Lazy load MainModule
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '',
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
