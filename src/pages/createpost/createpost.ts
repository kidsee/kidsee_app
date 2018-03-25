import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../app/models/post';

@IonicPage()
@Component({
    selector: 'page-createpost',
    templateUrl: 'createpost.html',
})
export class CreatePostPage {
    private post: Post;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.post = this.navParams.get('post');
    }
}
