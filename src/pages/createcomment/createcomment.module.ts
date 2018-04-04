import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatecommentPage } from './createcomment';

@NgModule({
  declarations: [
    CreatecommentPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatecommentPage),
  ],
})
export class CreatecommentPageModule {}
