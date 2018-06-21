import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BaseHeaderComponent } from './base-header/base-header';
import { TimelineContainerComponent } from './timeline-container/timeline-container';
import { TranslateModule } from '@ngx-translate/core';
import { AnswerTypeNumberComponent } from './answer-type-number/answer-type-number';
import { AnswerTypeMultipleChoiceComponent } from './answer-type-multiple-choice/answer-type-multiple-choice';
import { AnswerTypeTextComponent } from './answer-type-text/answer-type-text';

@NgModule({
  declarations: [
    BaseHeaderComponent,
    TimelineContainerComponent,
    AnswerTypeNumberComponent,
    AnswerTypeMultipleChoiceComponent,
    AnswerTypeTextComponent
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    BaseHeaderComponent,
    TimelineContainerComponent,
    AnswerTypeNumberComponent,
    AnswerTypeMultipleChoiceComponent,
    AnswerTypeTextComponent
  ]
})
export class ComponentsModule {
}