import * as _ from 'underscore';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { RatingServiceProvider } from "../../providers/rating-service/rating-service";
import { ThemeServiceProvider } from "../../providers/theme-service/theme-service";
import { LocationServiceProvider } from "../../providers/location-service/location-service";
import { Theme } from "../../app/models/theme";
import { Rating } from "../../app/models/rating";
import { Location } from "../../app/models/location";


@IonicPage()
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
})
export class RatingPage {
  protected themes :Theme[] = [];
  protected ratings :Rating[] = [];
  protected selectedTheme :Theme;
  private doneCounter :number = 0;
  protected topTen :Location[] = [];

  constructor(
    private navController: NavController,
    private ratingService: RatingServiceProvider,
    private themeService: ThemeServiceProvider,
    private locationService: LocationServiceProvider
  ) { }

  protected back() {
    this.navController.pop();
  }

  ionViewDidLoad() {
    this.fetchThemes();
  }

  private fetchThemes() {
    this.themeService.themes({}).subscribe(
      themes => {
        themes.getModels().forEach(theme => {
          this.themes.push(theme);
        });
        this.selectTheme(this.themes[0]);
      }
    )
  }

  protected selectTheme(theme :Theme) {
    this.ratings = [];
    this.topTen = [];
    this.doneCounter = 0;
    this.selectedTheme = theme;

    this.fetchTopTen();
  }

  private fetchTopTen() {
    this.locationService.TopTenByTheme(this.selectedTheme.id).subscribe(
      locations => {
        locations.getModels().forEach(location => {
          this.topTen.push(location);
        });
      }
    )
  }

}
