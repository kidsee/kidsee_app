import { Injectable } from '@angular/core';
import { Datastore } from "../datastore/datastore";
import { Observable } from "rxjs/Observable";
import { Comment } from "../../app/models/comment";

@Injectable()
export class CommentServiceProvider {

  constructor(
    private datastore: Datastore,
  ) { }

  public createComment(data) {
    return Observable.create(observer => {
      this.datastore.createRecord(Comment, data).save().subscribe();
      observer.next(true);
      observer.complete();
    });
  }
}
