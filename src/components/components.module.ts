import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BaseHeaderComponent } from './base-header/base-header';
import { TimelineContainerComponent } from './timeline-container/timeline-container';

@NgModule({
  declarations: [BaseHeaderComponent,
    TimelineContainerComponent],
  imports: [IonicModule],
  exports: [BaseHeaderComponent,
    TimelineContainerComponent]
})
export class ComponentsModule {
}