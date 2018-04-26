import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePostPage } from './create-post';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    CreatePostPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePostPage),
    TranslateModule
  ],
})
export class CreatePostPageModule {}
