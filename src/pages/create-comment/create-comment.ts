import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommentServiceProvider } from "../../providers/comment-service/comment-service";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { ContentTypeServiceProvider } from "../../providers/content-type-service/content-type-service";

@IonicPage()
@Component({
  selector: 'page-create-comment',
  templateUrl: 'create-comment.html',
})
export class CreateCommentPage {
  protected commentAttributes = {content: ''};

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private commentService: CommentServiceProvider,
    private authService: AuthServiceProvider,
    private contentTypeService: ContentTypeServiceProvider
  ) {
    this.commentAttributes['post'] = this.navParams.get('post');
  }

  protected createComment() {
    this.authService.fetchCurrentUser().then(user => {
      this.contentTypeService.getTypeByName("plain_text").then(type => {
        this.commentAttributes['content-type'] = type;
        this.commentAttributes['user'] = user;
        this.commentService.createComment(this.commentAttributes).subscribe(_ => {
          this.navCtrl.pop();
        });
      });
    });
  }

  protected back() {
    this.navCtrl.pop();
  }
}