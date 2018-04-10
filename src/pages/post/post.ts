import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from "../../app/models/post";

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  protected post: Post;

  constructor(
    private navController: NavController,
    private navParams: NavParams,
  ) { }

  ionViewDidEnter() {
    this.post = this.navParams.get('post');
  }

  back() {
    this.navController.pop();
  }
}
