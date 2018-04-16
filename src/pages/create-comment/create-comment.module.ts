import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCommentPage } from './create-comment';

@NgModule({
  declarations: [
    CreateCommentPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCommentPage),
    TranslateModule
  ],
})
export class CreateCommentPageModule {}
