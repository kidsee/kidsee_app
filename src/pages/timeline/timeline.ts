import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PostService } from "../../providers/post-service/post-service";
import { Post } from "../../app/models/post";

@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})

export class TimelinePage {
  protected posts: Post[] = [];
  private page = 0;

  constructor(
    private navController: NavController,
    private postService: PostService
  ) { }

  protected goToPost(post: Post) {
    this.navController.push('PostPage', {post: post});
  }

  ionViewDidEnter() {
    this.fetchNewPage();
  }

  private fetchNewPage() {
    this.page++;
    this.postService.posts({page: this.page}).subscribe(
      posts => {
        posts.getModels().forEach(post => {
          this.posts.push(post);
        });
      }
    )
  }

  protected doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.fetchNewPage();
      infiniteScroll.complete();
    }, 500);
  }
}
