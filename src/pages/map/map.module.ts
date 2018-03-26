import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';
import { ComponentsModule } from '../../components/components.module';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    MapPage,
  ],
  imports: [
    IonicPageModule.forChild(MapPage),
    ComponentsModule,
    TranslateModule,
  ],
  exports: [
    MapPage
  ]
})
export class MapPageModule {}
