import {Injectable} from "@angular/core";
import {Post} from "../../app/models/post";
import {ContentType} from "../../app/models/contentType";
import {PostStatus} from "../../app/models/poststatus";
import {Datastore} from "../datastore/datastore";
import {User} from "../../app/models/user";
import {Comment} from "../../app/models/comment";
import {Headers} from "@angular/http";
import {AuthServiceProvider} from "../auth-service/auth-service";

@Injectable()
export class PostService {
    currentPost: Post;

    constructor(private datastore: Datastore, private auth: AuthServiceProvider) { }


    public posts()
    {
        let contentTypeQuestion = this.datastore.createRecord(ContentType, {
            name: "question",
            description: "een vraag"
        });
        let contentTypeAnswer = this.datastore.createRecord(ContentType, {
            name: "answer",
            description: "een antwoord"
        });

        let postStatus = this.datastore.createRecord(PostStatus, {
            name: "active"
        });

        let user = this.datastore.createRecord(User, {
            username: "De naam van de testuser"
        });

        let posts: Post[] = [];
        let post = this.datastore.createRecord(Post,
            {
                id: 1,
                content: "Heey, kijk mijn test post content!",
                user: user,
                type: contentTypeQuestion,
                postStatus: postStatus,
                title: "een test post",
            });

        let firstComment = this.datastore.createRecord(Comment, {
            user: user,
            post: post,
            content: "Wow!!",
            type: contentTypeAnswer
        });
        let secondComment = this.datastore.createRecord(Comment, {
            user: user,
            post: post,
            content: "Supercool!!",
            type: contentTypeAnswer
        });
        post.comments.push(firstComment);
        post.comments.push(secondComment);
        for(let i = 0; i < 60; i++)
        {
            posts.push(post);
        }
        return posts;
    }

    public getCurrentPost(){
        return this.currentPost;
    }

    public createPost(post){
        console.log(post);

        let self = this;
        let headers = new Headers();
        headers.append('Content-Type', 'application/vnd.api+json');
        headers.append('Authorization', 'Bearer '+this.auth.getToken());

        let postToSave = this.datastore.createRecord(Post, {
            title: post.title,
            content: post.content,
            type: post.type,
            location: post.location,
            user: post.user,
            status: new PostStatus(self.datastore),
            'content-type': new ContentType(self.datastore)
        });
        
        postToSave.save(null, headers).subscribe();
    }

    public createComment(comment){
        console.log(comment);

        let self = this;
        let headers = new Headers();
        headers.append('Content-Type', 'application/vnd.api+json');
        headers.append('Authorization', 'Bearer '+this.auth.getToken());
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
}