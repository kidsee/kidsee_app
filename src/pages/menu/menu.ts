import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class MenuPage {
    // Basic root for our content view
    rootPage = 'TabsPage';
    user: any;
    username: any;

    constructor(private navCtrl: NavController, private auth: AuthServiceProvider) {

    }

    ionViewDidEnter() {
        let self = this;
        this.auth.getUser().then((res) => {
            self.user = res;
            self.username = self.user.username;
        });
    }

    public profile(){
        this.navCtrl.push('ProfilePage');
    }
}