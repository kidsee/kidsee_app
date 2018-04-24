import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
})
export class RatingPage {
  protected themes :string[] = ['Eten', 'Activiteiten', 'Natuur'];
  protected selectedTheme :string;
  protected items :string[];

  constructor() {
    this.selectedTheme = this.themes[0];
    this.selectTheme(this.selectedTheme);
  }

  selectTheme(theme: string) {
    this.selectedTheme = theme;
    if(theme === 'Eten') {
      this.items = [
        'McDonalds',
        'Sakana',
        'Picaso',
        'Subway'
      ]
    } else if (theme === 'Activiteiten') {
      this.items = [
        'Activiteit 1',
        'Activiteit 2',
        'Activiteit 3',
        'Activiteit 4',
        'Activiteit 5',
        'Activiteit 6',
        'Activiteit 7',
        'Activiteit 8',
        'Activiteit 9',
        'Activiteit 10',
      ]
    } else if (theme === 'Natuur') {
      this.items = [
        'Het Bossche Broek',
        'Zuiderplas'
      ]
    }
  }
}
