import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StreetViewServiceProvider } from '../../providers/street-view-service/street-view-service';
import { Location } from "../../app/models/location";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
  protected location: Location;
  protected image: SafeResourceUrl;
  protected hasWebsite = false;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private streetViewServiceProvider: StreetViewServiceProvider,
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef,
    private inAppBrowser: InAppBrowser
  ) {
    this.location = navParams.get('location');
    if(this.location.websiteLink){
      this.hasWebsite = true;
    }
    this.streetViewServiceProvider.getImage(this.location.address, 640, 400).then(response => {
      var image = URL.createObjectURL(response);
      this.image = this.sanitizer.bypassSecurityTrustResourceUrl(image);
      this.changeDetectorRef.detectChanges();
    });
  }

  protected openWebsite(){
    this.inAppBrowser.create(this.location.websiteLink);
  }

  protected back() {
    this.navCtrl.pop();
  }
}
