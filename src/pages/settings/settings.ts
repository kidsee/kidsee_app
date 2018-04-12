import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    private auth: AuthServiceProvider,
    private app: App,
    private navController: NavController
  ) { }

  protected back() {
    this.navController.pop();
  }

  protected logout() {
    this.auth.logout();
    this.app.getRootNav().setRoot('LoginPage');
  }
}
