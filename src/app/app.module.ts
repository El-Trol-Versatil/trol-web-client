import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

//Providers
import { TrollnetService } from './api/trollnet.service';

//Services
import { LoadingService } from './services/loading.service';
import { ToastService } from './services/toast.service';
import { AlertService } from './services/alert.service';
import { StorageService } from './services/storage.service';

//Database: Import the databases into the appModule in order to have a singleton of the application.
import { TrollnetDatabaseService } from './db/trollnet.service.db';

//Stores
import { TrollnetStore } from './stores/trollnet.store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
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

    //Databases
    TrollnetDatabaseService,

    //Stores
    TrollnetStore,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
