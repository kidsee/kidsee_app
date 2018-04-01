import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Datastore } from '../../providers/datastore/datastore';
import { User } from '../../app/models/user';
import { Headers } from "@angular/http";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: any;
  birthdate: string;

  constructor(private datastore: Datastore, public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider) {
  }

  updateUser(userProperty, value) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/vnd.api+json');
    headers.append('Authorization', 'Bearer ' + this.auth.currentToken);
    this.datastore.findRecord(User, String(this.auth.currentUserId), null, headers).subscribe(
      (user: User) => {
        user[userProperty] = value;
        user.save(null, headers).subscribe();
      }
    );
  }

  updateBirthdate() {
    this.updateUser("birthdate", Date.parse(this.birthdate));
  }

  updatePassword(value) {
    this.auth.changePassword(value);
  }

  ionViewDidLoad() {
    let self = this;
    this.auth.getUser().then((res) => {
      self.user = res;
      self.birthdate = self.user.birthdate.toISOString();
    });
  }
}
