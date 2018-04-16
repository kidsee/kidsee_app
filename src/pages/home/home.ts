import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { User } from "../../app/models/user";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  private user: User;

  constructor(
    private navController: NavController,
    private authServiceProvider: AuthServiceProvider
  ) { }

  ionViewDidLoad(){
    this.authServiceProvider.fetchCurrentUser().then(user => {
      this.user = user;
    });
  }

  protected profile() {
    this.navController.push('ProfilePage');
  }
}
