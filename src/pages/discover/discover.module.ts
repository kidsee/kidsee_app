import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscoverPage } from './discover';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DiscoverPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscoverPage),
    ComponentsModule
  ],
  exports: [
    DiscoverPage
  ]
})
export class DiscoverPageModule {}
