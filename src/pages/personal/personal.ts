import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PostService} from "../../providers/post-service/post-service";
import {Post} from "../../app/models/post";

@IonicPage()
@Component({
    selector: 'page-personal',
    templateUrl: 'personal.html',
})

export class PersonalPage {

    private posts: Post[];

    constructor(public navCtrl: NavController, public navParams: NavParams, private postProv: PostService) { }

    public gotoPost(postid: string)
    {
        this.postProv.currentPost = this.posts.find(p => p.id == postid);
        this.navCtrl.push('PostPage');
    }

    ionViewDidEnter() {
        this.posts = this.postProv.posts();
    }
}
