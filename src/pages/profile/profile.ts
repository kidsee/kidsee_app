import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User } from '../../app/models/user';
import { TranslateService } from "@ngx-translate/core";
import {AlertServiceProvider} from "../../providers/alert-service/alert-service";
import { Camera } from "@ionic-native/camera";
import { PictureService } from "../../providers/picture-service/picture-service";

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
    private alertService: AlertServiceProvider,
    private pictureService: PictureService,
    private camera: Camera
  ) { }

  protected saveChanges() {
    this.user.birthdate = new Date(this.birthdate);
    return this.user.save();
  }

  protected back() {
    this.navController.pop();
  }

  protected openChangeDialog(item){
    this.translateService.get(['new', 'edit', 'cancel', 'edit', item]).subscribe(translation => {
      let alert = this.alertController.create({
        title: translation[item] + ' ' + translation.edit,
        inputs: [
          {
            name: 'new',
            placeholder: translation.new + ' ' + translation[item]
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
              var attribute = this.user[item];
              this.user[item] = data.new;
                this.saveChanges().subscribe(success => {
                  this.translateService.get(['success', 'lowercase_edited', 'ok', item]).subscribe(translation => {
                    this.alertService.showPopup(translation.success, translation[item] + ' ' + translation.lowercase_edited, translation.ok);
                  });
                  return true;
                }, error => {
                  this.user[item] = attribute;
                  this.translateService.get(['fail','lowercase_already_in_use', 'ok', item]).subscribe(translation => {
                    this.alertService.showPopup(translation.fail, translation[item] + ' ' + translation.lowercase_already_in_use, translation.ok);
                  });
                  return false;
                });
                return true;
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

  protected openPictureDialog() {
    this.translateService.get(['choose_source', 'library', 'camera', 'cancel', 'upload']).subscribe(translation => {
      let alert = this.alertService.createAlert(translation.choose_source);
      this.alertService.addRadioButton(alert, translation.library, this.camera.PictureSourceType.PHOTOLIBRARY, false);
      this.alertService.addRadioButton(alert, translation.camera, this.camera.PictureSourceType.CAMERA, false);
      this.alertService.addButton(alert, translation.cancel);
      this.alertService.addButton(alert, translation.upload,
        (data: any) => {
          this.takePicture(data);
        });
      alert.present();
    });
  }

  private takePicture(sourceType) {
    this.pictureService.takePicture(sourceType).then(picture => {
      this.authServiceProvider.fetchCurrentUser().then(user => {
        this.pictureService.uploadAvatar(user, picture).then(avatar => {
          this.user.avatar = this.pictureService.retrieveFullImageUrl(avatar as string);
        });
      });
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
      user.avatar = this.pictureService.retrieveFullImageUrl(user.avatar);
    });
  }
}
