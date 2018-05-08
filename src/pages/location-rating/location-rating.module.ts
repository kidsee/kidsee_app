import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationRatingPage } from './location-rating';
import { Ionic2RatingModule } from "ionic2-rating";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    LocationRatingPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationRatingPage),
    Ionic2RatingModule,
    TranslateModule,
  ],
})
export class LocationRatingPageModule {}
