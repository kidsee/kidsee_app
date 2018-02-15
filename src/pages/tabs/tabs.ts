import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'PersonalPage';
  tab2Root = 'KidseePage';
  tab3Root = 'DiscoverPage';
  tab4Root = 'MapPage';

  constructor() {

  }
}