import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class AlertServiceProvider {

  constructor(public alertCtrl: AlertController) {
  }

  showPopup(title, text, prompt) {
    let alert = this.alertCtrl.create({
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
