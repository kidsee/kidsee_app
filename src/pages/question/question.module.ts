import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionPage } from './question';
import { ComponentsModule } from "../../components/components.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    QuestionPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionPage),
    ComponentsModule,
    TranslateModule
  ],
})
export class PostPageModule {}
