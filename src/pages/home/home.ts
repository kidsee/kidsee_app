import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../app/models/user";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { GoogleMaps,  GoogleMap,  GoogleMapsEvent,  LatLng} from '@ionic-native/google-maps';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LocationServiceProvider } from "../../providers/location-service/location-service";
import { Location } from '../../app/models/location';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  private user: User;
  private map: GoogleMap;
  private locations: Location[] = [];

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    private authServiceProvider: AuthServiceProvider,
    private androidPermissions: AndroidPermissions,
    private screenOrientation: ScreenOrientation,
    private locationService: LocationServiceProvider)
    {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  ionViewDidLoad(){
    this.authServiceProvider.fetchCurrentUser().then(user => {
      this.user = user;
    });
    this.loadMap();

  }

  loadMap() {
    //creates a new map
    this.map = GoogleMaps.create('map_canvas');
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      //gets location permission
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.LOCATION).then(result => {
      if(!result.hasPermission){
        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.LOCATION]);
      }},err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.LOCATION));
      //sets more map properties
      this.map.setMyLocationEnabled(true);
      this.map.setCameraZoom(15);
      let latLng: LatLng = new LatLng(51.6888981, 5.3037321);
      this.map.setCameraTarget(latLng);
      this.setMarkers();
    });

  }

  setMarkers(){
    this.locationService.locations().then((res) => {
      console.log(res);
      this.locations = res as Location[];
        this.locations.forEach(location => {

          this.map.addMarker({
            position: {lat: location.lat, lng: location.lon},
            title: location.name

          });

        });
      }
    );


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
    this.navController.push('PuzzlePage');
  }

  public questionandanswer() {
    this.navController.push('QuestionandanswerPage');
  }

  public photoandvideo() {
    this.navController.push('PhotoandvideoPage');
  }

}
