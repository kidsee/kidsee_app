import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoPostPage } from './photo-post';
import { ComponentsModule } from "../../components/components.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    PhotoPostPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoPostPage),
    ComponentsModule,
    TranslateModule
  ],
})
export class PostPageModule {}
