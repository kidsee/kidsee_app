import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../app/models/user";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng } from '@ionic-native/google-maps';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LocationServiceProvider } from "../../providers/location-service/location-service";
import { Location } from '../../app/models/location';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  private user: User;
  private map: GoogleMap;
  private locations: Location[] = [];
  protected loaded = false;
  public radialVisible = false;
  public menuVisible = true;
  public radialClasses = "front_buttons animated zoomIn";
  public profileButtonClasses = "profile_button animated fadeIn";
  public settingsButtonClasses = "settings_button animated fadeIn";
  public containerClasses = "animated fadeIn";
  public buttonGridClasses = "button_grid animated fadeIn";
  public radialAmount = 5;
  public radialIcons = ["assets/imgs/photo-icon.png", "assets/imgs/question-icon.png", "assets/imgs/puzzle-icon.png", "assets/imgs/rating-icon.png", "assets/imgs/info-icon.png"];
  public radialURLs = [" ", " ", " ", " ", " "];
  public currentSelectedLocation : Location;

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    private authServiceProvider: AuthServiceProvider,
    private androidPermissions: AndroidPermissions,
    private screenOrientation: ScreenOrientation,
    private locationService: LocationServiceProvider,
    private platform: Platform,
    private changeDetectorRef: ChangeDetectorRef,
    private geolocation: Geolocation
  ) {
    platform.registerBackButtonAction(() => {
      if(this.radialVisible == true){
        this.closeMarkerMenu();
      }
    },1);
  }

  ionViewDidEnter() {
    this.authServiceProvider.fetchCurrentUser().then(user => {
      this.user = user;
    });
    if (this.platform.is('cordova')) {
      this.loadMap();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }

  loadMap() {
    //creates a new map
    this.map = GoogleMaps.create('map_canvas');
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.geolocation.getCurrentPosition().then((resp) => { 
      //gets location permission
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.LOCATION).then(result => {
      if(!result.hasPermission) {
        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.LOCATION]);
      }},err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.LOCATION));
      //sets more map properties
      this.map.setMyLocationEnabled(true);
      this.map.setCameraZoom(15);
      let latLng: LatLng = new LatLng(resp.coords.latitude, resp.coords.longitude);
      this.map.setCameraTarget(latLng);
      try {
        this.setMarkers();
      } catch (error) {
        console.log(error);
      }
    });
    
  });
  }


  setMarkers() {
    this.locationService.locations().then((res) => {
      this.locations = res as Location[];
      this.locations.forEach(location => {
        //if location type
        //change different icons
        this.map.addMarker({
          position: { lat: location.lat, lng: location.lon },
          title: location.name,
          icon: {
            url: "assets/imgs/Coins.png",
            size: {
              width: 40,
              height: 40
            }
          }
        }).then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK)
            .subscribe(() => {
              this.currentSelectedLocation = location;
              this.setRadialLayout(location);
              this.openMarkerMenu();
            });
        })
      });
    }
    );
  }

  

  public setRadialLayout(location: Location) {
    //check what buttons are needed
    //set icons
    this.radialIcons[0] = "assets/imgs/photo-icon.png";
    this.radialIcons[1] = "assets/imgs/question-icon.png";
    this.radialIcons[2] = "assets/imgs/puzzle-icon.png";
    this.radialIcons[3] = "assets/imgs/rating-icon.png";
    this.radialIcons[4] = "assets/imgs/info-icon.png";
    this.radialURLs[0] = "PhotoandvideoPage";
    this.radialURLs[1] = "QuestionandanswerPage";
    this.radialURLs[2] = "AssignmentPage";
    this.radialURLs[3] = "LocationRatingPage";
    // this.radialURLs[4] = "info";

  }

  public openMarkerMenu() {
    this.map.setAllGesturesEnabled(false);
    setTimeout(() => {
      this.profileButtonClasses = "profile_button animated fadeOut";
      this.settingsButtonClasses = "settings_button animated fadeOut";
      this.containerClasses = "animated fadeOut";
      this.buttonGridClasses = "button_grid animated fadeOut";
      this.menuVisible = false;
      this.changeDetectorRef.detectChanges();
      this.menuVisible = true;
      this.radialVisible = true;
      this.changeDetectorRef.detectChanges();
      setTimeout(() => {
        this.menuVisible = false;
        this.changeDetectorRef.detectChanges();
      }, 1000);
    }, 300);
  }

  public closeMarkerMenu() {

    this.radialClasses = "front_buttons animated zoomOut";
    this.radialVisible = false;
    this.changeDetectorRef.detectChanges();
    this.radialVisible = true;
    this.profileButtonClasses = "profile_button animated fadeIn";
    this.settingsButtonClasses = "settings_button animated fadeIn";
    this.containerClasses = "animated fadeIn";
    this.buttonGridClasses = "button_grid animated fadeIn";
    this.menuVisible = true;
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.radialVisible = false;
      this.changeDetectorRef.detectChanges();
    }, 1000);
    this.map.setAllGesturesEnabled(true);
    this.radialClasses = "front_buttons animated zoomIn";
  }

  public redirect(buttonNo: number) {
    let direction = this.radialURLs[buttonNo-1];
    this.navController.push(direction, {location: this.currentSelectedLocation});
  }

  public settings() {
    this.navController.push('SettingsPage');
  }

  public profile() {
    this.navController.push('ProfilePage');
  }

  public rating() {
    this.navController.push('RatingPage');
  }

  public puzzle() {
    this.navController.push('AssignmentPage');
  }

  public questionandanswer() {
    this.navController.push('QuestionandanswerPage');
  }

  public photoandvideo() {
    this.navController.push('PhotoandvideoPage');
  }

}
