import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionandanswerPage } from './questionandanswer';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    QuestionandanswerPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionandanswerPage),
    TranslateModule,
    ComponentsModule,
  ],
  exports: [
    QuestionandanswerPage
  ]
})
export class QuestionandanswerPageModule {

}
