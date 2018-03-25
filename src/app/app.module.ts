import { BrowserModule } from '@angular/platform-browser';
import { JsonApiModule } from 'angular2-jsonapi';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Datastore } from '../providers/datastore/datastore';
import {PostService} from "../providers/post-service/post-service";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    JsonApiModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    Datastore,
    PostService
  ]
})
export class AppModule {}
