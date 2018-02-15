import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KidseePage } from './kidsee';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    KidseePage,
  ],
  imports: [
    IonicPageModule.forChild(KidseePage),
    ComponentsModule
  ],
  exports: [
    KidseePage
  ]
})
export class KidseePageModule {}
