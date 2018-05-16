import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from "../../app/models/post";
import { RatingServiceProvider } from "../../providers/rating-service/rating-service";

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
    private ratingService: RatingServiceProvider
  ) { }

  ionViewDidEnter() {
    this.post = this.navParams.get('post');
    if(this.post.comments) {
      this.post.comments.forEach(comment => {
        this.ratingService.getTotalRating(comment).then(rating => {
          comment.rating = rating;
        });
      });
    }
  }

  protected back() {
    this.navController.pop();
  }

  protected createComment(){
    this.navController.push('CreateCommentPage', { post: this.post });
  }
}
