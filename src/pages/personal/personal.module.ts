import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalPage } from './personal';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PersonalPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalPage),
    ComponentsModule
  ],
  exports: [
    PersonalPage
  ]
})
export class PersonalPageModule {}
