import { Injectable } from "@angular/core";
import { Rating } from "../../app/models/rating";
import { Datastore } from "../datastore/datastore";
import { JsonApiModel } from "angular2-jsonapi";

@Injectable()
export class RatingServiceProvider {
  constructor(
    private datastore: Datastore
  ) { }

  public ratings(params: {}) {
    return this.datastore.findAll(Rating, params);
  }

  public createRating(data) {
    return this.datastore.createRecord(Rating, data).save();
  }

  public getTotalRating(object: JsonApiModel) {
    return new Promise(resolve => {
      let type = object.modelConfig.type.slice(0, -1);
      const params = {
        filter: {
          object_type: type,
          object_id: object.id
        }
      };
      this.datastore.findAll(Rating, params).subscribe(data => {
        let ratings = data.getModels();
        let total = 0;
        ratings.forEach(rating => {
          total += rating.rating;
        });
        resolve(total);
      });
    });
  }
}