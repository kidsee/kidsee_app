import { Component, ElementRef, Renderer } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(
    private element: ElementRef, 
    private renderer: Renderer,
    private navController: NavController
  ) {
    this.height = 170;
    this.renderer.setElementStyle(this.element.nativeElement, 'height', this.height + 'px');
  }

  expandTimeline() {
    this.navController.push('PersonalPage');
  }

}
