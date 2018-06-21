import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Location } from '../../app/models/location';
import { PostService } from "../../providers/post-service/post-service";
import { ContentTypeServiceProvider } from "../../providers/content-type-service/content-type-service";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { StatusServiceProvider } from "../../providers/status-service/status-service";
import { LocationServiceProvider } from '../../providers/location-service/location-service';
import { TranslateService } from "@ngx-translate/core";
import { AlertServiceProvider } from "../../providers/alert-service/alert-service";
import { Camera } from "@ionic-native/camera";
import { PictureService } from "../../providers/picture-service/picture-service";
import { PostTypeServiceProvider } from "../../providers/post-type-service/post-type-service";

@IonicPage()
@Component({
  selector: 'page-create-photo',
  templateUrl: 'create-photo.html',
})
export class CreatePhotoPage {
  private postAttributes = { title: '', location: '', content: ''};
  protected locations: Location[] = [];
  protected selectedLocation;
  protected url: string;

  constructor(
    private navController: NavController,
    private postService: PostService,
    private contentTypeService: ContentTypeServiceProvider,
    private authService: AuthServiceProvider,
    private statusService: StatusServiceProvider,
    private locationService: LocationServiceProvider,
    private navParams: NavParams,
    private translateService: TranslateService,
    private alertService: AlertServiceProvider,
    private camera: Camera,
    private pictureService: PictureService,
    private postTypeService: PostTypeServiceProvider
  ) { }

  protected createPost() {
    this.authService.fetchCurrentUser().then(user => {
      this.contentTypeService.getTypeByName("image").then(type => {
        this.statusService.getStatusByName("accepted").then(status => {
          this.locationService.getLocationByName(this.selectedLocation).then(location => {
            this.postTypeService.getTypeByName("post").then(postType => {
              this.postAttributes['location'] = location;
              this.postAttributes['status'] = status;
              this.postAttributes['user'] = user;
              this.postAttributes['content-type'] = type;
              this.postAttributes['post-type'] = postType;
              this.postService.createPost(this.postAttributes).subscribe(post => {
                this.pictureService.getBase64(this.url).then(base64 => {
                  this.postService.postById(post.id).subscribe(superPost => {
                    superPost.content = base64 as string;
                    superPost.save().subscribe();
                    superPost.content = this.pictureService.retrieveFullImageUrl(post.content);
                  });
                  this.navController.pop();
                });
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
        const locations = result as Location[];
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

  protected openPictureDialog() {
    this.translateService.get(['choose_source', 'library', 'camera', 'cancel', 'upload']).subscribe(translation => {
      let alert = this.alertService.createAlert(translation.choose_source);
      this.alertService.addRadioButton(alert, translation.library, this.camera.PictureSourceType.PHOTOLIBRARY, false);
      this.alertService.addRadioButton(alert, translation.camera, this.camera.PictureSourceType.CAMERA, false);
      this.alertService.addButton(alert, translation.cancel);
      this.alertService.addButton(alert, translation.upload,
        (data: any) => {
          this.takePicture(data);
        });
      alert.present();
    });
  }

  private takePicture(sourceType) {
    this.pictureService.takePicture(sourceType).then(path => {
      this.url = path as string;
    });
  }

}
