import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';



@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, private app: App, private navController: NavController) {
  }

  back() {
    this.navController.pop();
  }

  public logout() {
    this.auth.logout();
    this.app.getRootNav().setRoot('LoginPage');
  }
}
