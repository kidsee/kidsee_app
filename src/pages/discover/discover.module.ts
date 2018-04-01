import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscoverPage } from './discover';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    DiscoverPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscoverPage),
    ComponentsModule,
    TranslateModule,
  ],
  exports: [
    DiscoverPage
  ]
})
export class DiscoverPageModule {
}
