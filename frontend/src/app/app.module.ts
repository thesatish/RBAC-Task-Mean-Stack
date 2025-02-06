import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarSidebarComponent } from './dashboard/navbar-sidebar/navbar-sidebar.component';
import { MainContentComponent } from './dashboard/main-content/main-content.component';
import { HomeContentComponent } from './dashboard/home-content/home-content.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarSidebarComponent,
    MainContentComponent,
    HomeContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
