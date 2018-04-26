import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BaseHeaderComponent } from './base-header/base-header';
import { TimelineContainerComponent } from './timeline-container/timeline-container';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [BaseHeaderComponent,
    TimelineContainerComponent],
  imports: [IonicModule, TranslateModule],
  exports: [BaseHeaderComponent,
    TimelineContainerComponent]
})
export class ComponentsModule {
}