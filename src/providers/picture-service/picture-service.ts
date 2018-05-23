import { Injectable } from "@angular/core";
import { Camera } from "@ionic-native/camera";
import { Base64 } from '@ionic-native/base64';
import { Datastore } from "../datastore/datastore";

@Injectable()
export class PictureService {

  constructor(
    private camera: Camera,
    private base64: Base64,
    private datastore: Datastore
  ) {
  }

  public takePicture(sourceType) {
    return new Promise(resolve => {
      var options = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        targetWidth: 150,
        targetHeight: 150
      };

      this.camera.getPicture(options).then((imagePath) => {
        resolve(imagePath);
      });
    });
  }

  private getBase64(imagePath: string)
  {
    return new Promise(resolve => {
      this.base64.encodeFile(imagePath).then((base64File: string) => {
          let headLessBase64 = base64File.replace("data:image/*;charset=utf-8;base64,", "");
          headLessBase64 = headLessBase64.replace(/(\r\n|\n|\r)/gm,"");
          resolve(headLessBase64);
        }, (err) => {
          console.log("Error!");
          console.log(err);
        }
      );
    });
  }

  public uploadAvatar(user, path) {
    return new Promise(resolve => {
      this.getBase64(path).then(base64 => {
        user.avatar = base64;
        user.save().subscribe(user => {
          resolve(user.avatar);
        })
      });
    });
  }

  public retrieveFullImageUrl(shortUrl: string) {
    let baseUrl = this.datastore.getBaseUrl().split('api')[0];
    if(shortUrl.indexOf(baseUrl) >= 0) {
      return shortUrl;
    }
    let fullUrl = baseUrl + shortUrl;
    return fullUrl;
  }
}