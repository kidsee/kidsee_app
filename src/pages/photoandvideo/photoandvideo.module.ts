import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoAndVideoPage } from './photoandvideo';
import { ComponentsModule } from "../../components/components.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    PhotoAndVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoAndVideoPage),
    TranslateModule,
    ComponentsModule,
  ],
})
export class PhotoandvideoPageModule {}
