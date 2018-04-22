import { Injectable } from "@angular/core";
import { Post } from "../../app/models/post";
import { Datastore } from "../datastore/datastore";

@Injectable()
export class PostService {
  constructor(
    private datastore: Datastore
  ) { }

  public posts(params: {}) {
    return this.datastore.findAll(Post, params);
  }
}