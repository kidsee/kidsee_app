import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-createpost',
    templateUrl: 'createpost.html',
})
export class CreatepostPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    public save()
    {
        //send information to backend
    }
}
