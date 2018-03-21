import {Injectable} from "@angular/core";
import {Post} from "../../app/models/post";
import {ContentType} from "../../app/models/contentType";
import {PostStatus} from "../../app/models/poststatus";
import {Datastore} from "../datastore/datastore";
import {User} from "../../app/models/user";
import {Comment} from "../../app/models/comment";

@Injectable()
export class PostService {
    currentPost: Post;

    constructor(private datastore: Datastore) { }


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
}