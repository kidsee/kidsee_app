import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StreetViewServiceProvider } from '../../providers/street-view-service/street-view-service';
import { Location } from "../../app/models/location";
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
  location: Location;
  image: SafeResourceUrl;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private streetViewServiceProvider: StreetViewServiceProvider,
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.location = navParams.get('location');
    this.streetViewServiceProvider.getImage(this.location.address, 640, 400).then(response => {
      var image = URL.createObjectURL(response);
      this.image = sanitizer.bypassSecurityTrustResourceUrl(image);
      this.changeDetectorRef.detectChanges();
    });
  }

  protected back() {
    this.navCtrl.pop();
  }
}
