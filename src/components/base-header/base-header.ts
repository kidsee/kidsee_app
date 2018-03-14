import { Component, Input } from '@angular/core';
import { NavController, App} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'base-header',
  templateUrl: 'base-header.html'
})
export class BaseHeaderComponent {

  @Input() title: string;
  constructor(private nav: NavController, private auth: AuthServiceProvider, private app: App) {
    
  }
 
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.app.getRootNav().setRoot('LoginPage');
    });
  }
}
