import { Injectable } from "@angular/core";
import { Post } from "../../app/models/post";
import { Datastore } from "../datastore/datastore";
import { JsonApiQueryData } from "angular2-jsonapi";

@Injectable()
export class PostService {
  constructor(private datastore: Datastore) {
  }

  public posts()
  {
    return new Promise((resolve, reject) => {
      this.datastore.findAll(Post,  null).subscribe(
        (posts: JsonApiQueryData<Post>) => {
          resolve(posts.getModels());}
      );
    });
  }
}