import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationServiceProvider } from "../../providers/location-service/location-service";
import { RatingServiceProvider } from "../../providers/rating-service/rating-service";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { User } from "../../app/models/user";
import { AlertServiceProvider } from "../../providers/alert-service/alert-service";
import { TranslateService } from "@ngx-translate/core";
import { Location } from "../../app/models/location";

@IonicPage()
@Component({
  selector: 'page-location-rating',
  templateUrl: 'location-rating.html',
})
export class LocationRatingPage {
  location: Location;
  protected rating = { rating: '', description: '', object_type: '', object_id: Number, user: User };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private locationService: LocationServiceProvider,
    private ratingService: RatingServiceProvider,
    private authService: AuthServiceProvider,
    private alertServiceProvider: AlertServiceProvider,
    private translateService: TranslateService
  ) {
    this.location = navParams.get('location');
  }

  protected submit() {
    this.locationService.getLocationById(this.location.id).then(location => {
      this.rating.object_type = 'location';
      this.rating.object_id = location.id;
      this.authService.fetchCurrentUser().then(user => {
        this.rating.user = user;
        this.ratingService.createRating(this.rating).subscribe(success => {
          this.translateService.get(['success', 'successfully_rated', 'ok']).subscribe(translation => {
            this.alertServiceProvider.showPopup(translation.success, translation.successfully_rated, translation.ok);
          });
          this.navCtrl.pop();
        }, error => {
          this.translateService.get(['fail', 'rating_already_saved', 'ok']).subscribe(translation => {
            this.alertServiceProvider.showPopup(translation.fail, translation.rating_already_saved, translation.ok);
          });
        });
      })
    });
  }
}
