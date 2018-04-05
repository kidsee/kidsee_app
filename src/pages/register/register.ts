import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = {email: '', password: '', birthdate: '', username: ''};

  constructor(private nav: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController, private translate: TranslateService) {
    this.translate.get('success').subscribe(res => {
      console.log(res)
    });
  }

  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
        if (success) {
          this.createSuccess = true;
          this.translate.get(['success', 'accountCreated']).subscribe(translations => {
            this.showPopup(translations['success'], translations['accountCreated']);
            this.nav.push('LoginPage');
          });
        } else {
          this.translate.get(['error', 'problemCreatingAccount']).subscribe(translations => {
            this.showPopup(translations['error'], translations['problemCreatingAccount']);
          });
        }
      },
      error => {
        this.translate.get('error').subscribe(translation => {
          this.showPopup(translation, error);
        });
      });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}