import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostService } from "../../providers/post-service/post-service";
import { Post } from "../../app/models/post";
import { Location } from "../../app/models/location";
import { TranslateService } from "@ngx-translate/core";
import { AlertServiceProvider } from "../../providers/alert-service/alert-service";
import { RatingServiceProvider } from "../../providers/rating-service/rating-service";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { ThemeServiceProvider } from "../../providers/theme-service/theme-service";

@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {
  protected posts: Post[] = [];
  private page = 0;
  private location: Location;
  private selectedSort;
  private selectedFilter;
  private filterOptions = [];

  constructor(
    private navController: NavController,
    private postService: PostService,
    private navParams: NavParams,
    private alertService: AlertServiceProvider,
    private translateService: TranslateService,
    private ratingService: RatingServiceProvider,
    private authService: AuthServiceProvider,
    private themeService: ThemeServiceProvider
  ) {
    this.themeService.themes({}).subscribe(themes => {
      themes.getModels().forEach(theme => {
        this.filterOptions.push(theme);
      })
    })
  }

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

    if(this.selectedFilter)
    {
      params = {
        page: this.page,
        sort: this.selectedSort
      };
      this.postService.postsByTheme(this.selectedFilter, params).subscribe(data => {
        this.authService.fetchCurrentUser().then(user => {
          let posts = data.getModels();
          posts.forEach(post => {
            this.ratingService.checkIfUserHasRatedObject(post, user).then(rating => {
              if(rating) {
                post.rated = true;
              }
            });
            this.posts.push(post);
          });
        });
      })
    }
    else {

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

      this.postService.posts(params).subscribe(posts => {
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
      });
    }
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
        { title: translations.highest_rated, value: '-rating_count'      },
        { title: translations.lowest_rated,  value: 'rating_count'       },
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

  protected resetSort() {
    this.selectedSort = undefined;
    this.resetPosts();
  }

  protected openFilter() {
    this.translateService.get(['choose_filter', 'cancel', 'filter']).subscribe(
      translations => {
        let alert = this.alertService.createAlert(translations.choose_filter);
        this.filterOptions.forEach(filter => {
          let checked = filter.id == this.selectedFilter;
          this.alertService.addRadioButton(alert, filter.name, filter.id, checked);
        });

        this.alertService.addButton(alert, translations.cancel);
        this.alertService.addButton(alert, translations.filter,
          (data: any) => {
            this.selectedFilter = data;
            this.resetPosts();
          });
        alert.present();
      }
    );
  }

  protected resetFilter() {
    this.selectedFilter = undefined;
    this.resetPosts();
  }

  private resetPosts() {
    this.page = 0;
    this.posts = [];
    this.fetchNewPage();
  }
}
