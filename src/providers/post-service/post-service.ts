import {Injectable} from "@angular/core";
import {Post} from "../../app/models/post";
import {ContentType} from "../../app/models/contentType";
import {PostStatus} from "../../app/models/poststatus";
import {Datastore} from "../datastore/datastore";
import {User} from "../../app/models/user";
import {Comment} from "../../app/models/comment";
import {Headers} from "@angular/http";
import {AuthServiceProvider} from "../auth-service/auth-service";
import {JsonApiQueryData} from "angular2-jsonapi";

@Injectable()
export class PostService {
    currentPost: Post;

    constructor(private datastore: Datastore, private auth: AuthServiceProvider) {
    }

    public createPost(post){
        console.log(post);

        let self = this;
        let headers = new Headers();
        headers.append('Content-Type', 'application/vnd.api+json');
        headers.append('Authorization', 'Bearer '+this.auth.getToken());
        //TODO: uncomment and pray when posts are implemented in api
        // let postToSave = this.datastore.createRecord(Post, {
        //     title: post.title,
        //     content: post.content,
        //     type: post.type,
        //     location: post.location,
        //     user: self.auth.getUser(),
        //     //TODO: fix poststatus?
        //     postStatus: new PostStatus(self.datastore)
        // });
        //
        // postToSave.save(null, headers).subscribe();
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
        return new Promise((resolve, reject) => {
            this.datastore.findAll(Post,  null, headers).subscribe(
                (posts: JsonApiQueryData<Post>) => {
                    resolve(posts.getModels());}
            );
        });
    }

    public getCurrentPost(){
        return this.currentPost;
    }
}