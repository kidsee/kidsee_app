import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostService } from "../../providers/post-service/post-service";
import { Post } from "../../app/models/post";

@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})

export class PersonalPage {
  private posts: Post[] = [];
  private amountOfShownPosts: number;

  public viewPosts: Post[] = [];

  constructor(
    private navController: NavController,
    private navParams: NavParams,
    private postService: PostService
  ) {
    this.amountOfShownPosts = 5;
  }

  public gotoPost(post: Post) {
    this.navController.push('PostPage', {post: post});
  }

  ionViewDidEnter() {
    this.posts = [];
    this.viewPosts = [];
    this.postService.posts().then((res) => {
      this.posts = res as Post[];
        if (this.posts.length < this.amountOfShownPosts) {
          this.amountOfShownPosts = this.posts.length;
        }
        for (let i = 0; i < this.amountOfShownPosts; i++) {
          this.viewPosts.push(this.posts[i]);
        }
      }
    );

  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      let min = this.viewPosts.length;
      let max;
      if (min + this.amountOfShownPosts > this.posts.length) {
        max = this.posts.length;
      }
      else {
        max = min + this.amountOfShownPosts;
      }

      for (let i = min; i < max; i++) {
        this.viewPosts.push(this.posts[i]);
      }
      infiniteScroll.complete();
    }, 500);
  }
}
