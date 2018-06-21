import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from "../../app/models/post";
import { RatingServiceProvider } from "../../providers/rating-service/rating-service";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { JsonApiModel } from "angular2-jsonapi";
import { PictureService } from "../../providers/picture-service/picture-service";

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {
  protected post: Post;

  constructor(
    private navController: NavController,
    private navParams: NavParams,
    private ratingService: RatingServiceProvider,
    private authService: AuthServiceProvider,
    private pictureService: PictureService
  ) { }

  ionViewDidEnter() {
    this.post = this.navParams.get('post');
    this.authService.fetchCurrentUser().then(user => {
      this.post.user.avatar = this.pictureService.retrieveFullImageUrl(this.post.user.avatar);
      if(this.post.comments) {
        this.post.comments.forEach(comment => {
          if(comment.user) {
            comment.user.avatar = this.pictureService.retrieveFullImageUrl(comment.user.avatar);
          }
          this.ratingService.getTotalRating(comment).then(rating => {
            comment.rating = rating;
          });
          this.ratingService.checkIfUserHasRatedObject(comment, user).then(rating => {
            if (rating) {
              comment.rated = true;
            }
          })
        });
      }
    });
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
