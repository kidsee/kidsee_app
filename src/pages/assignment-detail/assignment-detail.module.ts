import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssignmentDetailPage } from './assignment-detail';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AssignmentDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AssignmentDetailPage),
    ComponentsModule,
    TranslateModule
  ],
})
export class AssignmentDetailPageModule {}
