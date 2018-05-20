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

  public createAlert(title) {
    return this.alertController.create({title: title});
  }

  public addRadioButton(alert, label, value, checked) {
    alert.addInput({
      type: 'radio',
      label: label,
      value: value,
      checked: checked
    });
  }

  public addButton(alert, text, handler = undefined) {
    alert.addButton({
      text: text,
      handler: handler
    });
  }
}
