import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { AssignmentPage } from './assignment';

@NgModule({
  declarations: [
    AssignmentPage
  ],
  imports: [
    IonicPageModule.forChild(AssignmentPage),
    TranslateModule
  ],
})
export class AssignmentPageModule {}
