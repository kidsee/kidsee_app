import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { ProfilePage } from "./profile";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    ComponentsModule,
    TranslateModule
  ],
  exports: [
    ProfilePage
  ]
})
export class ProfilePageModule {
}
