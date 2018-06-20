import { Theme } from "../../app/models/theme"
import { Injectable } from '@angular/core';
import { Datastore } from '../datastore/datastore';
import { JsonApiQueryData } from "angular2-jsonapi";
@Injectable()
export class ThemeServiceProvider {
  constructor(
    private datastore: Datastore
  ) { }

  public themes(params: {}) {
    return this.datastore.findAll(Theme, params);
  }

  public getThemeByName(name){
    return this.datastore.findAll(Theme, {
      name: name,
    });
  }

  public getAllThemes(){
    
      return new Promise<any>((resolve) => {
        this.themes({}).subscribe(
          
            (locationTypes: JsonApiQueryData<Theme>) => {
              resolve(locationTypes.getModels());}
          
        );
      });
    }
    
  } 