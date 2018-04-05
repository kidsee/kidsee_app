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

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider) {
  }

  updateUser(userProperty, value) {
    this.auth.fetchCurrentUser().then(function (user){
      user[userProperty] = value;
      user.save().subscribe();
    })
  }

  updateBirthdate() {
    this.updateUser("birthdate", Date.parse(this.birthdate));
  }

  updatePassword(value) {
    this.auth.changePassword(value);
  }

  ionViewDidEnter() {
    this.auth.fetchCurrentUser().then(user => {
      this.user = user;
      this.birthdate = this.user.birthdate.toISOString();
    });
  }
}
