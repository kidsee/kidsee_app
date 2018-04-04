import { Injectable } from "@angular/core";
import { Comment } from "../../app/models/comment";
import { ContentType } from "../../app/models/contentType";
import { Datastore } from "../datastore/datastore";
import { Headers } from "@angular/http";
import { AuthServiceProvider } from "../auth-service/auth-service";

@Injectable()
export class CommentService {
  commentsList: any;

  constructor(private datastore: Datastore, private auth: AuthServiceProvider) {
  }


  public comments() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/vnd.api+json');
    headers.append('Authorization', 'Bearer ' + this.auth.getToken());

    return this.datastore.findAll(Comment, null, headers)
      .subscribe(comments => {
        this.commentsList = comments;
      });
  }

  public createComment(comment) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    return new Promise(resolve => {
      this.datastore.findRecord(ContentType, '1', null, headers).subscribe(type => {
        let commentToSave = this.datastore.createRecord(Comment, {
          content: comment.content,
          user: comment.user,
          post: comment.post,
          'content-type': type
        });
        resolve(commentToSave.save(null, headers).subscribe());
      });
    });
  }
}