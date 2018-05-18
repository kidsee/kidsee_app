import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BaseHeaderComponent } from './base-header/base-header';
import { TimelineContainerComponent } from './timeline-container/timeline-container';
import { TranslateModule } from '@ngx-translate/core';
import { AnswerTypeNumberComponent } from './answer-type-number/answer-type-number';

@NgModule({
  declarations: [
    BaseHeaderComponent,
    TimelineContainerComponent,
    AnswerTypeNumberComponent
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    BaseHeaderComponent,
    TimelineContainerComponent,
    AnswerTypeNumberComponent
  ]
})
export class ComponentsModule {
}