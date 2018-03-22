import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PostService} from "../../providers/post-service/post-service";

@IonicPage()
@Component({
    selector: 'page-createpost',
    templateUrl: 'createpost.html',
})
export class CreatepostPage {
    private postProperties = {location: "", type: "", title: "", content: ""};

    constructor(public navCtrl: NavController, public navParams: NavParams, private postProv: PostService) {
    }

    public submitPost()
    {
        this.postProv.createPost(this.postProperties);
    }
}
