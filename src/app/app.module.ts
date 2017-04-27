import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PreciosComponent } from './components/precios/precios.component';
import { ProtegidaComponent } from './components/protegida/protegida.component';

import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt'

//Rutas
import { APP_ROUTING } from './app.routes';
//Servicios
import { Auth } from './services/auth.service';
import {AuthGuardService} from "./services/auth-guard.service";


export function authHttpServiceFactory(http: Http, options: RequestOptions){
  return new AuthHttp(new AuthConfig({}), http, options);
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PreciosComponent,
    ProtegidaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING
  ],
  providers: [
    Auth,
    AuthGuardService,
    {
      provide:AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
