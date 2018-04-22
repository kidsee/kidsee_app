import { TimelinePage } from './timeline';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    TimelinePage,
  ],
  imports: [
    IonicPageModule.forChild(TimelinePage),
    ComponentsModule,
    TranslateModule,
  ],
  exports: [
    TimelinePage
  ]
})
export class TimelinePageModule {
}
