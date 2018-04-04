import {Injectable} from "@angular/core";
import {Comment} from "../../app/models/comment";
import {ContentType} from "../../app/models/contentType";
import {Datastore} from "../datastore/datastore";
import {User} from "../../app/models/user";
import {Headers} from "@angular/http";
import {AuthServiceProvider} from "../auth-service/auth-service";

@Injectable()
export class CommentService {
    currentComment: Comment;
    commentsList: any;

    constructor(private datastore: Datastore, private auth: AuthServiceProvider) { }


    public comments()
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/vnd.api+json');
        headers.append('Authorization', 'Bearer '+this.auth.getToken());

        return this.datastore.findAll(Comment, null, headers)
        .subscribe( comments => {
            this.commentsList = comments;
        });
    }

    public createComment(comment){
        console.log(comment);

        let self = this;
        let headers = new Headers();
        headers.append('Content-Type', 'application/vnd.api+json');
        headers.append('Authorization', 'Bearer '+this.auth.getToken());



        console.log('post', comment.post.type.id);
        let commentToSave = this.datastore.createRecord(Comment, {
            content: comment.content,
            user: comment.user,
            post: comment.post,
            'content-type': comment.post.type 
        });
        
        commentToSave.save(null, headers).subscribe();
    }
}