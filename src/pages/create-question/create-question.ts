import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Location } from '../../app/models/location';
import { PostService } from "../../providers/post-service/post-service";
import { ContentTypeServiceProvider } from "../../providers/content-type-service/content-type-service";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { StatusServiceProvider } from "../../providers/status-service/status-service";
import { LocationServiceProvider } from '../../providers/location-service/location-service';
import { PostTypeServiceProvider } from "../../providers/post-type-service/post-type-service";

@IonicPage()
@Component({
  selector: 'page-create-question',
  templateUrl: 'create-question.html',
})
export class CreateQuestionPage {
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
    private navParams: NavParams,
    private postTypeService: PostTypeServiceProvider
  ) { }

  protected createPost() {
    this.authService.fetchCurrentUser().then(user => {
      this.contentTypeService.getTypeByName("plain_text").then(contentType => {
        this.statusService.getStatusByName("accepted").then(status => {
          this.locationService.getLocationByName(this.selectedLocation).then(location => {
            this.postTypeService.getTypeByName("question").then(postType => {
              this.postAttributes['location'] = location;
              this.postAttributes['status'] = status;
              this.postAttributes['user'] = user;
              this.postAttributes['content-type'] = contentType;
              this.postAttributes['post-type'] = postType;
              this.postService.createPost(this.postAttributes).subscribe(_ => {
                this.navController.pop();
              });
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
    let location = this.navParams.get('location');
    this.selectedLocation = (location) ? this.navParams.get('location').name : '';
  }

  protected back() {
    this.navController.pop();
  }
}
