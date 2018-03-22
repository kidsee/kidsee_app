import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {ProfileServiceProvider} from "../../providers/profile-service/profile-service";

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {
    private user: any;
    private birthdate: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private auth: AuthServiceProvider, private profileServ: ProfileServiceProvider) { }

    updateUser(userProperty, value){
        this.profileServ.updateUserProperty(userProperty, value);
    }

    updateBirthdate(){
        this.profileServ.updateUserProperty("birthdate", Date.parse(this.birthdate));
    }

    updatePassword(value){
        this.profileServ.changePassword(value);
    }

    ionViewDidLoad() {
        let self = this;
        this.auth.getUser().then((res) => {
            self.user = res;
            self.birthdate = self.user.birthdate.toISOString();
        });
    }


}
