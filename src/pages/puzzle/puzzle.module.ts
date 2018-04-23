import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PuzzlePage } from './puzzle';

@NgModule({
  declarations: [
    PuzzlePage,
  ],
  imports: [
    IonicPageModule.forChild(PuzzlePage),
  ],
})
export class PuzzlePageModule {}
