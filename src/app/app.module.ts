import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

//Providers
import { TrollnetService } from './api/trollnet.service';


//Services
import { LoadingService } from './services/loading.service';
import { ToastService } from './services/toast.service';
import { AlertService } from './services/alert.service';
import { StorageService } from './services/storage.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    //Singleton providers
    TrollnetService,

    //Singleton services
    LoadingService,
    ToastService,
    AlertService,
    StorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
