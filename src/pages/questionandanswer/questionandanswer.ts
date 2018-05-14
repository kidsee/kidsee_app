import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostService } from "../../providers/post-service/post-service";
import { Post } from "../../app/models/post";
import { Location } from "../../app/models/location";
import { RatingServiceProvider } from "../../providers/rating-service/rating-service";

@IonicPage()
@Component({
  selector: 'page-questionandanswer',
  templateUrl: 'questionandanswer.html',
})
export class QuestionandanswerPage {
  protected posts: Post[] = [];
  private page = 0;
  private location: Location;

  constructor(
    private navController: NavController,
    private postService: PostService,
    private navParams: NavParams,
    private ratingService: RatingServiceProvider
  ) { }

  protected goToPost(post: Post) {
    this.navController.push('PostPage', {post: post});
  }

  ionViewDidEnter() {
    this.location = this.navParams.get('location');
    this.fetchNewPage();
  }

  private fetchNewPage() {
    this.page++;
    let params = {};
    if(this.location) {
      params = {
        page: this.page,
        filter: {
          location_id: this.location.id,
        }};
    }
    else {
      params = {page: this.page};
    }
    this.postService.posts(params).subscribe(
      posts => {
        posts.getModels().forEach(post => {
          this.ratingService.getTotalRating(post).then(rating => {
            post.rating = rating;
            this.posts.push(post);
          });
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

  protected createPost(){
    this.navController.push('CreatePostPage', this.location);
  }

  protected back(){
    this.navController.pop();
  }
}
