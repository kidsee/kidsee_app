import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Post} from "../../app/models/post";
import {User} from "../../app/models/user";
import {PostService} from "../../providers/post-service/post-service";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

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
    user: User;

    constructor(public navCtrl: NavController, public navParams: NavParams, private postProv: PostService, private auth: AuthServiceProvider) {
    }

    ionViewDidEnter() {
        this.post = this.postProv.getCurrentPost();
    }

    public createcomment(post) {
        this.auth.getUser().then((user: User) => {
            this.user = user;
        }).then( value => {
            this.navCtrl.push('CreatecommentPage', {
                user: this.user,
                post: this.post
            });
        });
    }
}
