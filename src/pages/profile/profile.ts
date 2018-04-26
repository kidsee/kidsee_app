import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User } from '../../app/models/user';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  protected user: User;
  protected birthdate: string;

  constructor(
    private navController: NavController,
    private authServiceProvider: AuthServiceProvider
  ) { }

  protected saveChanges() {
    this.user.birthdate = new Date(this.birthdate);
    this.user.save().subscribe();
  }

  protected back() {
    this.navController.pop();
  }

  protected updatePassword(value) {
    this.authServiceProvider.changePassword(value);
  }

  ionViewDidEnter() {
    this.authServiceProvider.fetchCurrentUser().then(user => {
      this.user = user;
      this.birthdate = this.user.birthdate.toISOString();
    });
  }
}
