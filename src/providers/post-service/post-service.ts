import { Status } from '../../app/models/status';
import { ContentType } from '../../app/models/contentType';
import {Injectable} from "@angular/core";
import {Post} from "../../app/models/post";
import {Datastore} from "../datastore/datastore";
import {Headers} from "@angular/http";
import {AuthServiceProvider} from "../auth-service/auth-service";
import {JsonApiQueryData} from "angular2-jsonapi";

@Injectable()
export class PostService {
  currentPost: Post;

  constructor(private datastore: Datastore, private auth: AuthServiceProvider) {
  }

  public createPost(post){
    let headers = new Headers();
    headers.append('Content-Type', 'application/vnd.api+json');
    headers.append('Authorization', 'Bearer '+this.auth.getToken());
    return new Promise(resolve => {
      this.datastore.findRecord(Status, '3', null, headers).subscribe(status => {
        this.datastore.findRecord(ContentType, '1', null, headers).subscribe(type => {
          this.auth.getUser().then(user => {
            let postToSave = this.datastore.createRecord(Post, {
              title: post.title,
              type: post.type,
              content: post.content,
              location: post.location,
              content_type: type,
              status: status,
              user: user
            });
            resolve(postToSave.save(null, headers).subscribe());
          })
        })
      })
    });
  }

  public posts()
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/vnd.api+json');
    headers.append('Authorization', 'Bearer '+this.auth.getToken());
    return new Promise((resolve, reject) => {
      this.datastore.findAll(Post,  { include: 'post-statuses,content-types'}, headers).subscribe(
        (posts: JsonApiQueryData<Post>) => {
          resolve(posts.getModels());}
      );
    });
  }

  public getCurrentPost(){
    return this.currentPost;
  }
}