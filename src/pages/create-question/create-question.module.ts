import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateQuestionPage } from './create-question';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    CreateQuestionPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateQuestionPage),
    TranslateModule
  ],
})
export class CreatePostPageModule {}
