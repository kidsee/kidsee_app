import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { identification: '', password: '' };
 
  constructor(private nav: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private translate: TranslateService) { }
 
  public createAccount() {
    this.nav.push('RegisterPage');
  }
 
  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        this.nav.setRoot('MenuPage');
      } else {
          this.translate.get(['accessDenied']).subscribe(translation => {
              this.showError(translation);
          });
      }
    },
      error => {
        this.showError(error);
      });
  }
 
  showLoading() {
    let message ="";
      this.translate.get(['loading']).subscribe(translation => {
          message = translation;
      });
    this.loading = this.loadingCtrl.create({

      content: message,
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
    let title = "";
    let buttonText = "";

      this.translate.get(['fail', 'ok']).subscribe(translations => {
          title = translations[0];
          buttonText = translations[1];
      });
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [buttonText]
    });
    alert.present();
  }
}
