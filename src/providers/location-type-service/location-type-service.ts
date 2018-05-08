import { Injectable } from '@angular/core';
import { Datastore } from "../datastore/datastore";
import { LocationType } from "../../app/models/locationType";

@Injectable()
export class LocationTypeServiceProvider {

  constructor(
    private datastore: Datastore
  ) { }

  public locationTypes(){
    return this.datastore.findAll(LocationType);
  }

  public getTypeByName(name: String){
    return new Promise<any>((resolve) => {
      this.locationTypes().subscribe(
        locationTypes => {
          locationTypes.getModels().forEach(type => {
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
