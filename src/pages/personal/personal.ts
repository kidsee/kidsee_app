import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-personal',
    templateUrl: 'personal.html',
})

export class PersonalPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) { }

    public post()
    {
        this.navCtrl.push('PostPage');
    }

    public createpost()
    {
        this.navCtrl.push('CreatepostPage');
    }
}
