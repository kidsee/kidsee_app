import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import {ProfilePage} from "./profile";

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    ComponentsModule
  ],
  exports: [
    ProfilePage
  ]
})
export class ProfilePageModule {}
