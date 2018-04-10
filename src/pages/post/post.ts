import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from "../../app/models/post";
import { PostService } from "../../providers/post-service/post-service";

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  post: Post;

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    private postService: PostService
  ) { }

  ionViewDidEnter() {
    this.post = this.navParams.get('post');
    console.log(this.post)
  }

  back() {
    this.navController.pop();
  }
}
