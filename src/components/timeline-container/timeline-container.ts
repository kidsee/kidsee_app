import { Component, ElementRef, Renderer } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostService } from "../../providers/post-service/post-service";
import { Post } from "../../app/models/post";

/**
 * Generated class for the TimelineContainerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'timeline-container',
  templateUrl: 'timeline-container.html'
})
export class TimelineContainerComponent {
  private posts: Post[] = [];
  private amountOfShownPosts: number = 5;

  public viewPosts: Post[] = [];
  height: Number;
  sizeMode: Boolean = true;
  isOpen: Boolean = true;

  constructor(
    private element: ElementRef, 
    private renderer: Renderer,
    private navController: NavController,
    private postService: PostService
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
    this.height = 1;
    this.sizeMode = !this.sizeMode;
    this.renderList();
  }

  public gotoPost(post: Post) {
    this.navController.push('PostPage', {post: post});
  }

  ngOnInit() {  
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
    console.log(this.posts);
    console.log(this.viewPosts);
    this.renderList();
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
