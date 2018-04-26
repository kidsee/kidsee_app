import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class AlertServiceProvider {

  constructor(
    private alertController: AlertController
  ) { }

  public showPopup(title, text, prompt) {
    let alert = this.alertController.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: prompt,
          handler: data => {
            alert.dismiss();
            return false;
          }
        }
      ]
    });
    alert.present();
  }
}
