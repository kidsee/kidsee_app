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
          postToSave.save(null, headers).subscribe();
        })
      })
    })
  }

  public createComment(comment) {
    console.log(comment);

    let self = this;
    let headers = new Headers();
    headers.append('Content-Type', 'application/vnd.api+json');
    headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    //TODO: uncomment and pray when comments are implemented in api
    // let commentToSave = this.datastore.createRecord(Comment, {
    //    user: user,
    //    post: post,
    //    content: "Wow!!",
    //    type: contentTypeAnswer
    //});
    //
    // commentToSave.save(null, headers).subscribe();

  }

  public posts()
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/vnd.api+json');
    headers.append('Authorization', 'Bearer '+this.auth.getToken());
    this.datastore.findAll(Status, null, headers).subscribe(statuses => {
      console.log(statuses.getModels());
    })

    return new Promise((resolve, reject) => {
      this.datastore.findAll(Post,  { include: 'post-statuses,content-types'}, headers).subscribe(
        (posts: JsonApiQueryData<Post>) => {
          console.log(posts.getModels());
          resolve(posts.getModels());}
      );
    });
  }

  public getCurrentPost(){
    return this.currentPost;
  }
}