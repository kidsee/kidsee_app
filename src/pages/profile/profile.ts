import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User } from '../../app/models/user';
import { TranslateService } from "@ngx-translate/core";
import {AlertServiceProvider} from "../../providers/alert-service/alert-service";

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
    private translateService: TranslateService,
    private alertService: AlertServiceProvider
  ) { }

  protected saveChanges() {
    this.user.birthdate = new Date(this.birthdate);
    this.user.save().subscribe();
  }

  protected back() {
    this.navController.pop();
  }

  protected openChangeDialog(item){
    this.translateService.get(['new', 'edit', 'repeat', 'cancel', 'edit']).subscribe(translation => {

      let alert = this.alertController.create({
        title: item + ' ' + translation.edit,
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
            text: translation.edit,
            handler: data => {
              if (data.new == data.repeat) {
                this.user[item] = data.repeat;
                this.saveChanges();
              } else {
                this.translateService.get(['fail','items_do_not_match', 'ok']).subscribe(translation => {
                  this.alertService.showPopup(translation.fail, translation.items_do_not_match, translation.ok);
                });
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
    this.translateService.get(['password', 'old_password', 'new_password', 'repeat_password', 'cancel', 'edit']).subscribe(translation => {

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
            placeholder: translation.repeat_password,
            type: 'password'
          }
        ],
        buttons: [
          {
            text: translation.cancel,
            role: 'cancel'
          },
          {
            text: translation.edit,
            handler: data => {
              if(this.checkPassword(data.password, data.newPassword, data.repeatPassword))
                return this.updatePassword(data.password, data.newPassword);
                return false;
            }
          }
        ]
      });
      alert.present();
    });
  }

  private checkPassword(value, newPassword, compareTo){
    if(value == newPassword){
      this.translateService.get(['fail','old_password_matches_new_password', 'ok']).subscribe(translation => {
        this.alertService.showPopup(translation.fail, translation.old_password_matches_new_password, translation.ok);
      });
      return false;
    } else if(newPassword != compareTo) {
      this.translateService.get(['fail','new_passwords_do_not_match', 'ok']).subscribe(translation => {
        this.alertService.showPopup(translation.fail, translation.new_passwords_do_not_match, translation.ok);
      });
      return false;
    }
    return true;
  }

  private updatePassword(oldPassword, value) {

    this.authServiceProvider.fetchCurrentUser().then(user => {
      let credentials = {
        identification: user.username,
        password: oldPassword
      };
      this.authServiceProvider.login(credentials).subscribe(success => {
          this.authServiceProvider.changePassword(value);
          this.translateService.get(['success', 'edited_password', 'ok']).subscribe(translation => {
            this.alertService.showPopup(translation.success, translation.edited_password, translation.ok);
          });
          return true;
      }, error => {
          this.translateService.get(['fail','did_not_edit_password', 'ok']).subscribe(translation => {
            this.alertService.showPopup(translation.fail, translation.did_not_edit_password, translation.ok);
          });
          return false;
      })
    });
  }

  ionViewDidEnter() {
    this.authServiceProvider.fetchCurrentUser().then(user => {
      this.user = user;
      this.birthdate = this.user.birthdate.toISOString();
    });
  }
}
