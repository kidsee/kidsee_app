import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from  '../../validators/confirmPassword';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(
    private navController: NavController,
    private authServiceProvider: AuthServiceProvider,
    private alertServiceProvider: AlertServiceProvider,
    private translateService: TranslateService,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_-]{6,18}$'), Validators.required])],
      email: ['', Validators.compose([Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), Validators.required])],
      birthdate: ['', Validators.compose([Validators.required])],
      postal_code: ['', Validators.compose([Validators.pattern('^[1-9][0-9]{3}\s?[a-zA-Z]{2}$'), Validators.required])],
      password: ['', Validators.compose([Validators.pattern('^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$'), Validators.required])],
      passwordConfirmation: ['', ConfirmPasswordValidator.checkConfirmPassword]
    });
  }

  public back() {
    this.navController.pop();
  }

  public register() {
    this.authServiceProvider.register(this.registerForm.value).subscribe(
      success => {
        this.translateService.get(['success', 'account_created', 'ok']).subscribe(translations => {
          this.alertServiceProvider.showPopup(
            translations.success,
            translations.account_created,
            translations.ok
          );
          this.navController.pop();
        });
      },
      error => {
        if(error.status == 0) {
          this.translateService.get(['error', 'no_connection', 'ok']).subscribe(translations => {
            this.alertServiceProvider.showPopup(
              translations.error,
              translations.no_connection,
              translations.ok
            );
          });
        } else {
          this.translateService.get(['error', 'problem_creating_account', 'ok']).subscribe(translations => {
            this.alertServiceProvider.showPopup(
              translations.error,
              translations.problem_creating_account,
              translations.ok
            );
          });
        }
      }
    );
  }
}
