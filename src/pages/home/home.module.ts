import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    ComponentsModule,
    TranslateModule
  ],
})
export class HomePageModule {}
