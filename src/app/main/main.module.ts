import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { provideHttpClient } from '@angular/common/http';
import { ServiceLogin } from '../services/service.login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [HomeComponent, ProfileComponent, EditProfileComponent],
  imports: [CommonModule, MainRoutingModule, FormsModule, ReactiveFormsModule, FullCalendarModule],
  providers: [provideHttpClient(), ServiceLogin],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule { }
