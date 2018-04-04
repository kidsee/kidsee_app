import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommentService } from "../../providers/comment-service/comment-service";
import { Post } from "../../app/models/post";
import { User } from "../../app/models/user";

@IonicPage()
@Component({
    selector: 'page-createcomment',
    templateUrl: 'createcomment.html',
})
export class CreatecommentPage {
    private commentProperties = { content: "" };
    private post: Post;
    private user: User;

    constructor(public navCtrl: NavController, public navParams: NavParams, private commentProv: CommentService) {
        this.post = navParams.get('post');
        this.user = navParams.get('user');
    }

    public submitComment()
    {
        this.commentProperties['post'] = this.post;
        this.commentProperties['user'] = this.user;
        this.commentProv.createComment(this.commentProperties).then(_ => {
          this.navCtrl.pop();
        });
    }
}
