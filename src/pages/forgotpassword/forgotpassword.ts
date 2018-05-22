import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  forgotPasswordForm: FormGroup;

  constructor(
    private navController: NavController,
    private authServiceProvider: AuthServiceProvider,
    private alertServiceProvider: AlertServiceProvider,
    private translateService: TranslateService,
    private formBuilder: FormBuilder
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), Validators.required])],
    });
  }

  public back() {
    this.navController.pop();
  }

  public resetPassword() {
    this.authServiceProvider.resetPassword(this.forgotPasswordForm.value).subscribe(
      success => {
        this.translateService.get(['success', 'password_reset_successful', 'ok']).subscribe(translations => {
          this.alertServiceProvider.showPopup(
            translations.success,
            translations.password_reset_successful,
            translations.ok
          );
          this.back();
        });
      },
      error => {
        this.translateService.get(['error', 'unknown_email', 'ok']).subscribe(translations => {
          this.alertServiceProvider.showPopup(
            translations.error,
            translations.unknown_email,
            translations.ok
          );
        });
      });
  }
}
