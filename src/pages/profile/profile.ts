import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User } from '../../app/models/user';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: User;
  birthdate: string;

  constructor(
    private navController: NavController,
    private navParams: NavParams,
    private authServiceProvider: AuthServiceProvider
  ) { }

  updateUser(userProperty, value) {
    this.authServiceProvider.fetchCurrentUser().then(function (user){
      user[userProperty] = value;
      user.save().subscribe();
    })
  }

  back() {
    this.navController.pop();
  }

  updateBirthdate() {
    this.updateUser("birthdate", Date.parse(this.birthdate));
  }

  updatePassword(value) {
    this.authServiceProvider.changePassword(value);
  }

  ionViewDidEnter() {
    this.authServiceProvider.fetchCurrentUser().then(user => {
      this.user = user;
      this.birthdate = this.user.birthdate.toISOString();
    });
  }
}
