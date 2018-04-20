import { Location } from "../../app/models/location"
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Datastore } from '../datastore/datastore';
import { JsonApiQueryData } from "angular2-jsonapi";


@Injectable()
export class LocationServiceProvider {
  constructor(
    private datastore: Datastore
  ) {
  }

  public locations()
  {
    return new Promise((resolve, reject) => {
      this.datastore.findAll(Location,  null).subscribe(
        (locations: JsonApiQueryData<Location>) => {
          resolve(locations.getModels());}
      );
    });
  }
}