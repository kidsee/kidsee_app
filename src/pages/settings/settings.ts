import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User } from "../../app/models/user";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  protected user: User;
  protected birthdate: string;

  constructor(
    private authService: AuthServiceProvider,
    private app: App,
    private navController: NavController
  ) { }

  protected back() {
    this.navController.pop();
  }

  protected saveChanges() {
    this.user.birthdate = new Date(this.birthdate);
    this.user.save().subscribe();
  }

  protected logout() {
    this.authService.logout();
    this.app.getRootNav().setRoot('LoginPage');
  }

  ionViewDidEnter() {
    this.authService.fetchCurrentUser().then(user => {
      this.user = user;
      this.birthdate = this.user.birthdate.toISOString();
    });
  }
}
