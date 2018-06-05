import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BaseHeaderComponent } from './base-header/base-header';
import { TimelineContainerComponent } from './timeline-container/timeline-container';
import { TranslateModule } from '@ngx-translate/core';
import { AnswerTypeNumberComponent } from './answer-type-number/answer-type-number';
import { AnswerTypeMultipleChoiceComponent } from './answer-type-multiple-choice/answer-type-multiple-choice';

@NgModule({
  declarations: [
    BaseHeaderComponent,
    TimelineContainerComponent,
    AnswerTypeNumberComponent,
    AnswerTypeMultipleChoiceComponent
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    BaseHeaderComponent,
    TimelineContainerComponent,
    AnswerTypeNumberComponent,
    AnswerTypeMultipleChoiceComponent
  ]
})
export class ComponentsModule {
}