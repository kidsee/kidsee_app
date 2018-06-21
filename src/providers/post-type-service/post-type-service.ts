import { Injectable } from '@angular/core';
import { Datastore } from "../datastore/datastore";
import { PostType } from "../../app/models/postType";

@Injectable()
export class PostTypeServiceProvider {

  constructor(
    private datastore: Datastore
  ) { }

  public postTypes(){
    return this.datastore.findAll(PostType);
  }

  public getTypeByName(name: String){
    return new Promise<any>((resolve) => {
      this.postTypes().subscribe(
        postTypes => {
          postTypes.getModels().forEach(type => {
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