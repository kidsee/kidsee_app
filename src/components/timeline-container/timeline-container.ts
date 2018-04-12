import { Component, ElementRef, Renderer } from '@angular/core';

/**
 * Generated class for the TimelineContainerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'timeline-container',
  templateUrl: 'timeline-container.html'
})
export class TimelineContainerComponent {

  height: Number;

  constructor(public element: ElementRef, public renderer: Renderer) {
    this.height = 140;
    this.renderer.setElementStyle(this.element.nativeElement, 'height', this.height + 'px');
  }

  expandTimeline() {

  }

}
