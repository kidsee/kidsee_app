import { Location } from "../../app/models/location"
import { Injectable } from '@angular/core';
import { Datastore } from '../datastore/datastore';
import { JsonApiQueryData } from "angular2-jsonapi";


@Injectable()
export class LocationServiceProvider {
  constructor(
    private datastore: Datastore
  ) { }

  public locations()
  {
    return new Promise((resolve, reject) => {
      this.datastore.findAll(Location,  null).subscribe(
        (locations: JsonApiQueryData<Location>) => {
          resolve(locations.getModels());}
      );
    });
  }

  public getLocationByName(name){
    return new Promise<any>((resolve) => {
      this.locations().then(
        result => {
          var locations = result as Location[];
          locations.forEach(location => {
            if (location.name == name) {
              resolve(location);
            }
          });
          resolve(false);
        }
      );
    });
  }
}