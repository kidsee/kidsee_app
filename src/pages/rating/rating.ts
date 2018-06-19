import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { ThemeServiceProvider } from "../../providers/theme-service/theme-service";
import { LocationServiceProvider } from "../../providers/location-service/location-service";
import { Datastore } from '../../providers/datastore/datastore';
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
  protected url: String;

  constructor(
    private navController: NavController,
    private themeService: ThemeServiceProvider,
    private locationService: LocationServiceProvider,
    private datastore: Datastore
  ) { 
    this.url = datastore.getBaseUrl().split('api')[0];
  }

  protected back() {
    this.navController.pop();
  }

  ionViewDidLoad() {
    this.fetchThemes();
  }

  private fetchThemes() {
    this.themeService.themes({}).subscribe(
      themes => {
        console.log('json', themes);
        themes.getModels().forEach(theme => {
          this.themes.push(theme);
        });
        this.selectTheme(this.themes[0]);
        console.log(this.themes);
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
