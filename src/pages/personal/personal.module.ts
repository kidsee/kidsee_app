import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalPage } from './personal';
import { ComponentsModule } from '../../components/components.module';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    PersonalPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalPage),
    ComponentsModule,
    TranslateModule,
  ],
  exports: [
    PersonalPage
  ]
})
export class PersonalPageModule {}
