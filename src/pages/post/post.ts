import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from "../../app/models/post";
import { RatingServiceProvider } from "../../providers/rating-service/rating-service";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { JsonApiModel } from "angular2-jsonapi";

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
    private ratingService: RatingServiceProvider,
    private authService: AuthServiceProvider,
  ) { }

  ionViewDidEnter() {
    this.post = this.navParams.get('post');
    if(this.post.comments) {
      this.authService.fetchCurrentUser().then(user => {
      this.post.comments.forEach(comment => {
        this.ratingService.getTotalRating(comment).then(rating => {
          comment.rating = rating;
        });
        this.ratingService.checkIfUserHasRatedObject(comment, user).then(rating => {
          if(rating) {
            comment.rated = true;
          }
        })
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

  protected upvote(object: JsonApiModel) {
    const type = object.modelConfig.type.slice(0, -1);
    this.authService.fetchCurrentUser().then(user => {
      this.ratingService.checkIfUserHasRatedObject(object, user).then(result => {
        if(result) {
          this.ratingService.deleteRating(result).subscribe(_ => {
            object.rating -= 1;
            object.rated = false;
          });
        }
        else {
          this.ratingService.createRating({
            rating: 1,
            description: 'upvote',
            object_type: type,
            object_id: object.id,
            user: user
          }).subscribe(_ => {
            object.rating += 1;
            object.rated = true;
          });
        }
      })
    });
  }
}
