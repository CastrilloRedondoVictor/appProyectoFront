import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { provideHttpClient } from '@angular/common/http';
import { ServiceLogin } from '../services/service.login';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, ProfileComponent],
  imports: [CommonModule, MainRoutingModule, FormsModule],
  providers: [provideHttpClient(), ServiceLogin],
})
export class MainModule {}
