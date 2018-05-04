import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { LocationTypeServiceProvider } from "../../providers/location-type-service/location-type-service";
import { RatingServiceProvider } from "../../providers/rating-service/rating-service";
import { LocationType } from "../../app/models/locationType";
import { Rating } from "../../app/models/rating";


@IonicPage()
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
})
export class RatingPage {
  protected themes :string[] = ['Eten', 'Activiteiten', 'Natuur']; //hardcoded
  protected selectedTheme :string; //hardcoded
  protected items :string[]; //hardcoded
  protected locationTypes :LocationType[] = [];
  protected ratings :Rating[] = [];
  protected selectedLocationType :LocationType;

  constructor(
    private navController: NavController,
    private locationTypeService: LocationTypeServiceProvider,
    private ratingService: RatingServiceProvider
  ) {
    this.selectedTheme = this.themes[0];
    this.selectTheme(this.selectedTheme);
  }

  public back() {
    this.navController.pop();
  }

  ionViewDidLoad() {
    this.getLocationTypes();
    console.log('locationTypes', this.locationTypes);
    console.log('ratings', this.ratings);
  }

  calculateTopTen(ratings :Rating[]) {
      //iets met group by op object_id en een average en dan limit 10
  }

  getRatingsByLocationType(locationType :LocationType) {
    //hier moet nog iets zodat het gefiltered wordt op locationtype
    this.ratingService.ratings({}).subscribe(
      ratings => {
        ratings.getModels().forEach(rating => {
          this.ratings.push(rating);
        });
      }
    )
  }

  getLocationTypes() {
    this.locationTypeService.locationTypes().subscribe(
      locationTypes => {
        locationTypes.getModels().forEach(locationType => {
          this.locationTypes.push(locationType);
        });
        this.selectLocationType(this.locationTypes[0]);
      }
    )
  }

  selectLocationType(locationType :LocationType) {
    this.selectedLocationType = locationType;
    this.getRatingsByLocationType(this.selectedLocationType);
    this.calculateTopTen(this.ratings);
    console.log('selectedLocationType', this.selectedLocationType);
  }

  //hardcoded
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
