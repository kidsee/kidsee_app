import { Injectable } from "@angular/core";
import { Rating } from "../../app/models/rating";
import { Datastore } from "../datastore/datastore";

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
}
