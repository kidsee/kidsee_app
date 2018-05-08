import * as _ from 'underscore';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { RatingServiceProvider } from "../../providers/rating-service/rating-service";
import { ThemeServiceProvider } from "../../providers/theme-service/theme-service";
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
    private themeService: ThemeServiceProvider
  ) { }

  protected back() {
    this.navController.pop();
  }

  ionViewDidLoad() {
    this.fetchThemes();
  }

  private calculateTopTen(ratings :Rating[]) {
    let groups = _.groupBy(ratings, function(rating){
      return rating.object_type + '#' + rating.object_id;
    });

    let avgDict = _.mapObject(groups, function(ratings, key) {
      return _.reduce(ratings, function(memo, rating) {
        return memo + rating.rating;
      }, 0) / ratings.length;
    });

    let avgArray = Object.keys(avgDict).map(function(key) {
      return [key, avgDict[key]];
    });

    let sortedArray = _.sortBy(avgArray, function(item){
      return item[1];
    });

    sortedArray.reverse();

    sortedArray.slice(0, Math.min(sortedArray.length, 10));

    sortedArray.forEach(item => {
      if(item[0].toString().split('#')[0] == 'location') {
        this.topTen.push(this.selectedTheme.locations.filter(location => location.id == item[0].toString().split('#')[1])[0]);
      }
    });

  }

  private fetchRatingsByLocations(locations :Location[]){
    locations.forEach( location => {
      this.fetchRatingsByLocationId(location.id);
    });
  }

  private fetchRatingsByLocationId(id :string) {
    this.ratingService.ratings({
      filter: {
        object_type: 'location',
        object_id: id
      }
    }).subscribe(
      ratings => {
        ratings.getModels().forEach(rating => {
          this.ratings.push(rating);
        });
        this.doneCounter++;
        if(this.doneCounter == this.selectedTheme.locations.length) {
          this.calculateTopTen(this.ratings);
        }
      }
    )
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
    this.fetchRatingsByLocations(this.selectedTheme.locations);
  }

}
