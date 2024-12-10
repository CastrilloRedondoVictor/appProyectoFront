import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { ProfileComponent } from './components/profile/profile.component';



@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
