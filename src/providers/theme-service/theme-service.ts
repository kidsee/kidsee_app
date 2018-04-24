import { Theme } from "../../app/models/theme"
import { Injectable } from '@angular/core';
import { Datastore } from '../datastore/datastore';
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
}