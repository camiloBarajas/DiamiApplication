// Importaciones
import { NgModule, enableProdMode, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeCOL from '@angular/common/locales/es-CO';

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// Firebase
import { FCM } from '@ionic-native/fcm/ngx';

// Configuración local de fecha
registerLocaleData(localeCOL, 'es');

// Sockets
import { SharedModule } from './modules/shared/shared.module';
const config: SocketIoConfig = { url: environment.urlApi, options: {} };

// Se habilita modo producción para evitar mensajes en consola
// enableProdMode();

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  exports: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    IonicModule.forRoot({
      mode: 'md',
      animated: true,
      persistConfig: true
    }),
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    InAppBrowser,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
