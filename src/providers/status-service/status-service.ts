import { Injectable } from '@angular/core';
import { Datastore } from "../datastore/datastore";
import { Status } from "../../app/models/status";

@Injectable()
export class StatusServiceProvider {

  constructor(
    private datastore: Datastore
  ) { }


  public statuses(){
    return this.datastore.findAll(Status);
  }

  public getStatusByName(name: String){
    return new Promise<any>((resolve) => {
      this.statuses().subscribe(
        statuses => {
          statuses.getModels().forEach(status => {
            if (status.name == name) {
              resolve(status);
            }
          });
          resolve(false);
        }
      );
    });
  }
}
