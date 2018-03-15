import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
    selector: 'page-personal',
    templateUrl: 'personal.html',
})

export class PersonalPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider) { }

}
