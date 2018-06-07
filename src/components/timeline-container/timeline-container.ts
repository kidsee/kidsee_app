import { Component, ElementRef, Renderer } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostService } from "../../providers/post-service/post-service";
import { Post } from "../../app/models/post";
import { RatingServiceProvider } from "../../providers/rating-service/rating-service";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";


@Component({
  selector: 'timeline-container',
  templateUrl: 'timeline-container.html',
})
export class TimelineContainerComponent {
  protected posts: Post[] = [];
  protected height: Number;
  protected sizeMode: Boolean = true;
  protected isOpen: Boolean = true;
  private page = 0;

  constructor(
    private element: ElementRef,
    private renderer: Renderer,
    private navController: NavController,
    private postService: PostService,
    private ratingService: RatingServiceProvider,
    private authService: AuthServiceProvider
  ) {
    this.height = 25;
  }
  renderList() {
    this.renderer.setElementStyle(this.element.nativeElement, 'height', this.height + '%');
  }

  open() {
    this.isOpen = true;
    this.height = this.sizeMode ? 62 : 25;
    this.renderList();
    this.sizeMode = !this.sizeMode;
  }

  close() {
    this.isOpen = false;
    this.height = 0;
    this.sizeMode = !this.sizeMode;
    this.renderList();
  }

  protected goToPost(post: Post) {
    this.navController.push('PostPage', {post: post});
  }

  ngAfterContentInit() {
    this.fetchNewPage();
    this.renderList();
  }

  openTimelinePage(){
    this.navController.push('TimelinePage');
  }

  private fetchNewPage() {
    this.page++;
    this.postService.posts({page: this.page, sort: '-inserted_at'}).subscribe(posts => {
        this.authService.fetchCurrentUser().then(user => {
          posts.getModels().forEach(post => {
            this.ratingService.checkIfUserHasRatedObject(post, user).then(rating => {
              if(rating) {
                post.rated = true;
              }
            });
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

}
