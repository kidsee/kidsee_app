import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User } from '../../app/models/user';
import { TranslateService } from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  protected user: User;
  protected birthdate: string;

  constructor(
    private navController: NavController,
    private authServiceProvider: AuthServiceProvider,
    private alertController: AlertController,
    private translateService: TranslateService
  ) { }

  protected saveChanges() {
    this.user.birthdate = new Date(this.birthdate);
    this.user.save().subscribe();
  }

  protected back() {
    this.navController.pop();
  }

  protected openChangeDialog(item){
    this.translateService.get(['new', 'repeat', 'cancel', 'change']).subscribe(translation => {

      let alert = this.alertController.create({
        title: item + ' ' + translation.change,
        inputs: [
          {
            name: 'new',
            placeholder: translation.new + ' ' + item
          },
          {
            name: 'repeat',
            placeholder: translation.repeat + ' ' + item
          }
        ],
        buttons: [
          {
            text: translation.cancel,
            role: 'cancel'
          },
          {
            text: translation.change,
            handler: data => {
              if (data.new == data.repeat) {
                this.user[item] = data.repeat;
                this.saveChanges();
              } else {
                return false;
              }
            }
          }
        ]
      });
      alert.present();
    });
  }

  protected openPasswordDialog(){
    this.translateService.get(['password', 'old_password', 'new_password', 'cancel', 'change']).subscribe(translation => {

      let alert = this.alertController.create({
        title: translation.password,
        inputs: [
          {
            name: 'password',
            placeholder: translation.old_password,
            type: 'password'
          },
          {
            name: 'newPassword',
            placeholder: translation.new_password,
            type: 'password'
          },
          {
            name: 'repeatPassword',
            placeholder: translation.new_password,
            type: 'password'
          }
        ],
        buttons: [
          {
            text: translation.cancel,
            role: 'cancel'
          },
          {
            text: translation.change,
            handler: data => {
              if (data.newPassword == data.repeatPassword) {
                //TODO: fix when backend is ready
                //this.updatePassword(data.oldPassword, data.newPassword);
              } else {
                return false;
              }
            }
          }
        ]
      });
      alert.present();
    });
  }

  protected updatePassword(oldPassword, value) {
    this.authServiceProvider.changePassword(oldPassword, value);
  }

  ionViewDidEnter() {
    this.authServiceProvider.fetchCurrentUser().then(user => {
      this.user = user;
      this.birthdate = this.user.birthdate.toISOString();
    });
  }
}
