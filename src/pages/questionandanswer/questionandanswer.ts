import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostService } from "../../providers/post-service/post-service";
import { Post } from "../../app/models/post";
import { Location } from "../../app/models/location";
import { TranslateService } from "@ngx-translate/core";
import { AlertServiceProvider } from "../../providers/alert-service/alert-service";

@IonicPage()
@Component({
  selector: 'page-questionandanswer',
  templateUrl: 'questionandanswer.html',
})
export class QuestionandanswerPage {
  protected posts: Post[] = [];
  private page = 0;
  private location: Location;
  private selectedSort;

  constructor(
    private navController: NavController,
    private postService: PostService,
    private navParams: NavParams,
    private alertService: AlertServiceProvider,
    private translateService: TranslateService
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
        },
        sort: this.selectedSort
      };
    }
    else {
      params = {
        page: this.page,
        sort: this.selectedSort
      };
    }
    this.postService.posts(params).subscribe(
      posts => {
        posts.getModels().forEach(post => {
          this.posts.push(post);
        })
      }
    );
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

  protected openSort() {
    this.translateService.get(
      ['choose_sorting', 'highest_rated', 'lowest_rated', 'most_recent', 'least_recent', 'cancel', 'sort']
    ).subscribe(translations => {
      let alert = this.alertService.createAlert(translations.choose_sorting);
      let options = [
        { title: translations.highest_rated, value: '-rating'      },
        { title: translations.lowest_rated,  value: 'rating'       },
        { title: translations.most_recent,   value: '-inserted_at' },
        { title: translations.least_recent,  value: 'inserted_at'  }
      ];

      options.forEach(option => {
        let checked = option.value == this.selectedSort;
        this.alertService.addRadioButton(alert, option.title, option.value, checked);
      });

      this.alertService.addButton(alert, translations.cancel);
      this.alertService.addButton(alert, translations.sort,
        (data: any) => {
          this.selectedSort = data;
          this.resetPosts();
      });
      alert.present();
    });
  }

  private resetPosts() {
    this.page = 0;
    this.posts = [];
    this.fetchNewPage();
  }
}
