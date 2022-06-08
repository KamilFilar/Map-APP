import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
// Font awasome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Reactiv forms
import { ReactiveFormsModule } from '@angular/forms';
// Services
import { MapService } from './shared/services/map.service';
// Components
import { AppComponent } from './app.component';
import { ButtonComponent } from './core/components/button/button.component';
import { MapComponent } from './core/components/map/map.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { ModalComponent } from './core/components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    MapComponent,
    NavbarComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
