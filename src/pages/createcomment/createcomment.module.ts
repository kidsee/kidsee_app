import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatecommentPage } from './createcomment';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    CreatecommentPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatecommentPage),
    TranslateModule,
  ],
})
export class CreatecommentPageModule {}
