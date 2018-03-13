import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the PersonalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {
  currentUser: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider) { }

  ionViewDidLoad() {
    let self = this;
    this.auth.getUser().then((res) => {
      self.currentUser = res;
    });  
  }

}
