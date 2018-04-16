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
  protected registerCredentials = {email: '', password: '', birthdate: '', username: ''};

  constructor(
    private navController: NavController,
    private authServiceProvider: AuthServiceProvider,
    private alertServiceProvider: AlertServiceProvider,
    private translateService: TranslateService
  ) { }

  protected register() {
    this.authServiceProvider.register(this.registerCredentials).subscribe(
      success => {
        this.translateService.get(['success', 'account_created', 'ok']).subscribe(translations => {
          this.alertServiceProvider.showPopup(
            translations.success,
            translations.account_created,
            translations.ok
          );
          this.navController.push('LoginPage');
        });
      },
      error => {
        this.translateService.get(['error', 'problem_creating_account', 'ok']).subscribe(translations => {
          this.alertServiceProvider.showPopup(
            translations.error,
            translations.problem_creating_account,
            translations.ok
          );
        });
      }
    );
  }
}