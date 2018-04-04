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
  private viewPosts: Post[] = [];
  private amountOfShownPosts: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private postProv: PostService) {
    this.amountOfShownPosts = 5;
  }

  public gotoPost(postid: string) {
    this.postProv.currentPost = this.posts.find(p => p.id == postid);
    this.navCtrl.push('PostPage');
  }

  ionViewDidEnter() {
    this.posts = [];
    this.viewPosts = [];
    let self = this;
    this.postProv.posts().then((res) => {
        self.posts = res as Post[];
        if (self.posts.length < this.amountOfShownPosts) {
          self.amountOfShownPosts = self.posts.length;
        }
        for (let i = 0; i < this.amountOfShownPosts; i++) {
          self.viewPosts.push(this.posts[i]);
        }
      }
    );

  }

  doInfinite(infiniteScroll) {
    let self = this;
    setTimeout(() => {
      let min = self.viewPosts.length;
      let max;
      if (min + this.amountOfShownPosts > self.posts.length) {
        max = self.posts.length;
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
