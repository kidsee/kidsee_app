import { Component, ElementRef, Renderer } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostService } from "../../providers/post-service/post-service";
import { Post } from "../../app/models/post";


@Component({
  selector: 'timeline-container',
  templateUrl: 'timeline-container.html'
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
    private postService: PostService
  ) {
    this.height = 25;
  }

  protected renderList() {
    this.renderer.setElementStyle(this.element.nativeElement, 'height', this.height + '%');
  }

  protected open() {
    this.isOpen = true;
    this.height = this.sizeMode ? 62 : 25;
    this.renderList();
    this.sizeMode = !this.sizeMode;
  }

  protected close() {
    this.isOpen = false;
    this.height = 1;
    this.sizeMode = !this.sizeMode;
    this.renderList();
  }

  protected gotoPost(post: Post) {
    this.navController.push('PostPage', {post: post});
  }

  ngAfterViewInit() {
    console.log("Ng on init");
    this.fetchNewPage();
    this.renderList();
  }

  protected openTimelinePage(){
    this.navController.push('TimelinePage');
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
