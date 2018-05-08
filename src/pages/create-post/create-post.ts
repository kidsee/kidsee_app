import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Location } from '../../app/models/location';
import { PostService } from "../../providers/post-service/post-service";
import { ContentTypeServiceProvider } from "../../providers/content-type-service/content-type-service";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { StatusServiceProvider } from "../../providers/status-service/status-service";
import { LocationServiceProvider } from '../../providers/location-service/location-service';

@IonicPage()
@Component({
  selector: 'page-create-post',
  templateUrl: 'create-post.html',
})
export class CreatePostPage {
  private postAttributes = { title: '', content: '', location: ''};
  protected locations: Location[] = [];
  protected selectedLocation;

  constructor(
    private navController: NavController,
    private postService: PostService,
    private contentTypeService: ContentTypeServiceProvider,
    private authService: AuthServiceProvider,
    private statusService: StatusServiceProvider,
    private locationService: LocationServiceProvider,
    private navParams: NavParams
  ) { }

  protected createPost() {
    this.authService.fetchCurrentUser().then(user => {
      this.contentTypeService.getTypeByName("plain_text").then(type => {
        this.statusService.getStatusByName("accepted").then(status => {
          this.locationService.getLocationByName(this.selectedLocation).then(location => {
            this.postAttributes['location'] = location;
            this.postAttributes['status'] = status;
            this.postAttributes['user'] = user;
            this.postAttributes['content-type'] = type;
            this.postService.createPost(this.postAttributes).subscribe(_ => {
              this.navController.pop();
            });
          });
        });
      });
    });
  }

  ionViewDidEnter(){
    this.locationService.locations().then(
      result => {
        var locations = result as Location[];
        locations.forEach(location => {
          this.locations.push(location);
        });
      }
    );
    let location = this.navParams.get('location')
    this.selectedLocation = (location) ? this.navParams.get('location').name : '';
  }

  protected back() {
    this.navController.pop();
  }
}
