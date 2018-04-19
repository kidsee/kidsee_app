import { BrowserModule } from '@angular/platform-browser';
import { JsonApiModule } from 'angular2-jsonapi';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { DatePicker } from '@ionic-native/date-picker';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Datastore } from '../providers/datastore/datastore';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { PostService } from "../providers/post-service/post-service";
import { IonicStorageModule } from '@ionic/storage';
import { AlertServiceProvider } from '../providers/alert-service/alert-service';
import { GoogleMaps } from "@ionic-native/google-maps";
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LocationServiceProvider } from '../providers/location-service/location-service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    JsonApiModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
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
    AlertServiceProvider,
    Datastore,
    DatePicker,
    PostService,
    GoogleMaps,
    AndroidPermissions,
    ScreenOrientation,
    LocationServiceProvider,
  ]
})
export class AppModule {
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
