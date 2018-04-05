import { AlertServiceProvider } from './../../providers/alert-service/alert-service';
import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, IonicPage } from 'ionic-angular';
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
  registerCredentials = {identification: '', password: ''};

  constructor(
    private nav: NavController,
    private auth: AuthServiceProvider,
    private alertCtrl: AlertServiceProvider,
    private loadingCtrl: LoadingController,
    private translate: TranslateService
  ) { }

  public createAccount() {
    this.nav.push('RegisterPage');
  }

  ionViewDidLoad(){
    this.auth.isAuthenticated().then(authenticated => {
      if(authenticated) {
        this.nav.setRoot('TabsPage');
      }
    })
  }

  login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(
      success => {
        this.nav.setRoot('TabsPage');
      },
      error => {
        this.translate.get(['fail', 'accessDenied', 'ok']).subscribe(translation => {
          this.alertCtrl.showPopup(translation.fail, translation.accessDenied, translation.ok);
          this.loading.dismiss();
        });
      }
    )
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true
    });
    this.loading.present();
  }
}
