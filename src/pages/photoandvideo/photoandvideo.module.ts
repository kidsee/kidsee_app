import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoandvideoPage } from './photoandvideo';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    PhotoandvideoPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoandvideoPage),
    TranslateModule,
    ComponentsModule,
  ],
  exports: [
    PhotoandvideoPage
  ]
})
export class PhotoandvideoPageModule {}
