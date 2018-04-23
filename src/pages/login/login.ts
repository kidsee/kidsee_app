import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loading: Loading;

  registerCredentials = {identification: '', password: ''};

  constructor(
    private navController: NavController,
    private authServiceProvider: AuthServiceProvider,
    private alertServiceProvider: AlertServiceProvider,
    private loadingController: LoadingController,
    private translateService: TranslateService
  ) { }

  protected createAccount() {
    this.navController.push('RegisterPage');
  }

  login() {
    this.showLoading();
    this.authServiceProvider.login(this.registerCredentials).subscribe(
      success => {
        this.navController.setRoot('HomePage');
      },
      error => {
        this.translateService.get(['fail', 'access_denied', 'ok']).subscribe(translation => {
          this.alertServiceProvider.showPopup(translation.fail, translation.access_denied, translation.ok);
          this.loading.dismiss();
        });
      }
    )
  }

  protected showLoading() {
    this.loading = this.loadingController.create({
      dismissOnPageChange: true
    });
    this.loading.present();
  }
}
