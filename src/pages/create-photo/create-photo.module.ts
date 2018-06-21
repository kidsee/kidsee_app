import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePhotoPage } from './create-photo';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    CreatePhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePhotoPage),
    TranslateModule
  ],
})
export class CreatePostPageModule {}
