import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../app/models/user";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  private user: User;

  constructor(public navController: NavController, public navParams: NavParams, private authServiceProvider: AuthServiceProvider) {
  }

  ionViewDidLoad(){
    this.authServiceProvider.fetchCurrentUser().then(user => {
      this.user = user;
    });
  }

  public profile() {
    this.navController.push('ProfilePage');
  }
}
