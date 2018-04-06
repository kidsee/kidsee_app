import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerCredentials = {email: '', password: '', birthdate: '', username: ''};

  constructor(
    private nav: NavController,
    private auth: AuthServiceProvider,
    private alertCtrl: AlertServiceProvider,
    private translate: TranslateService
  ) { }

  public register() {
    this.auth.register(this.registerCredentials).subscribe(
      success => {
        this.translate.get(['success', 'accountCreated', 'ok']).subscribe(translations => {
          this.alertCtrl.showPopup(
            translations.succes,
            translations.accountCreated,
            translations.ok
          );
          this.nav.push('LoginPage');
        });
      },
      error => {
        this.translate.get(['error', 'problemCreatingAccount', 'ok']).subscribe(translations => {
          this.alertCtrl.showPopup(
            translations.error,
            translations.problemCreatingAccount,
            translations.ok
          );
        });
      }
    );
  }
}