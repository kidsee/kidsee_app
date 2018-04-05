import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommentService } from "../../providers/comment-service/comment-service";
import { Post } from "../../app/models/post";
import { User } from "../../app/models/user";
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
    selector: 'page-createcomment',
    templateUrl: 'createcomment.html',
})
export class CreatecommentPage {
    private commentProperties = { content: "" };
    private post: Post;
    private user: User;

    constructor(public navCtrl: NavController, public navParams: NavParams, private commentService: CommentService, private translate: TranslateService) {
        this.post = navParams.get('post');
        this.user = navParams.get('user');
    }

    public submitComment()
    {
        this.commentProperties['post'] = this.post;
        this.commentProperties['user'] = this.user;
        this.commentService.createComment(this.commentProperties).then(_ => {
          this.navCtrl.pop();
        });
    }
}
