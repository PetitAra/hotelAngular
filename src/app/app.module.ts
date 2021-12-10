import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { HotelComponent } from './hotel/hotel.component';
import { ResaComponent } from './resa/resa.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './services/config.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ResaDetailsComponent } from './resa/resa-details/resa-details.component';
import { ClientDetailsComponent } from './client/client-details/client-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HotelComponent,
    ClientComponent,
    ResaComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ResaDetailsComponent,
    ClientDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
