import {Injectable} from "@angular/core";
import {Post} from "../../app/models/post";
import {Datastore} from "../datastore/datastore";
import {Headers, Http} from "@angular/http";
import {AuthServiceProvider} from "../auth-service/auth-service";
import {JsonApiQueryData} from "angular2-jsonapi";

@Injectable()
export class PostService {
    currentPost: Post;

    constructor(private datastore: Datastore, private http: Http, private auth: AuthServiceProvider) {

    }


    public posts()
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/vnd.api+json');
        headers.append('Authorization', 'Bearer '+this.auth.getToken());
        return new Promise((resolve, reject) => {
            this.datastore.findAll(Post,  {include: 'user'}, headers).subscribe(
                (posts: JsonApiQueryData<Post>) => {
                    resolve(posts.getModels());}
            );
        });
    }

    public getCurrentPost(){
        return this.currentPost;
    }
}