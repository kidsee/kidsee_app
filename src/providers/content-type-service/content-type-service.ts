import { Injectable } from '@angular/core';
import { Datastore } from "../datastore/datastore";
import { ContentType } from "../../app/models/contentType";

@Injectable()
export class ContentTypeServiceProvider {

  constructor(
    private datastore: Datastore
  ) { }

  public contentTypes(){
    return this.datastore.findAll(ContentType);
  }

  public getTypeByName(name: String){
    return new Promise<any>((resolve) => {
      this.contentTypes().subscribe(
        contentTypes => {
          contentTypes.getModels().forEach(type => {
            if (type.name == name) {
              resolve(type);
            }
          });
          resolve(false);
        }
      );
    });
  }
}
