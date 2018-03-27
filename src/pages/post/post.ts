import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Post} from "../../app/models/post";
import {PostService} from "../../providers/post-service/post-service";

/**
 * Generated class for the PostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-post',
    templateUrl: 'post.html',
})
export class PostPage {
    private post: Post;

    constructor(public navCtrl: NavController, public navParams: NavParams, private postProv: PostService) {
    }

    ionViewDidEnter() {
        this.post = this.postProv.getCurrentPost();
    }

    public createcomment() {
        this.navCtrl.push('CreatePostPage', { post: this.post });
    }
}
