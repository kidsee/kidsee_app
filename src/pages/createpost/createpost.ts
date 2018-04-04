import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../app/models/user';
import { PostService } from "../../providers/post-service/post-service";

@IonicPage()
@Component({
  selector: 'page-createpost',
  templateUrl: 'createpost.html',
})
export class CreatePostPage {
  private user: User;
  private postProperties = {location: "", type: "", title: "", content: ""};

  constructor(private postProv: PostService, public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user');
  }

  public submitPost() {
    this.postProperties['user'] = this.user;
    this.postProv.createPost(this.postProperties).then(_ => {
      this.navCtrl.pop();
    });
  }
}
