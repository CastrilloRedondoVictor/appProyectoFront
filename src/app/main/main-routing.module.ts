import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/edit/:id', component: EditProfileComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }, // Fallback dentro de Main
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
