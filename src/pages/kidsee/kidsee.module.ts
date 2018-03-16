import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KidseePage } from './kidsee';
import { ComponentsModule } from '../../components/components.module';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    KidseePage,
  ],
  imports: [
    IonicPageModule.forChild(KidseePage),
    ComponentsModule,
    TranslateModule,
  ],
  exports: [
    KidseePage
  ]
})
export class KidseePageModule {}
