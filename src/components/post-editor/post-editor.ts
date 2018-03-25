import { Component, Input } from '@angular/core';
import { App} from 'ionic-angular';
import {PostService} from "../../providers/post-service/post-service";
import { Post } from '../../app/models/post';

@Component({
    selector: 'post-editor',
    templateUrl: 'post-editor.html',
})
export class PostEditorComponent {
    private postProperties = {location: "", type: "", title: "", content: ""};
    private type: string;

    @Input('post') post: Post;
    constructor(private postProv: PostService, private app: App) {
    }

    ngOnInit() {
        console.log("post", this.post);
        //If the post is undefined it means you want to create a post, if you have the post it means you want to create a comment which belongs to that post
        if(this.post === undefined) {
            this.type = "Post";
        } else {
            this.type = "Comment";
        }
    }

    public submitPost()
    {
        if(this.type === "Post") {
            this.postProv.createPost(this.postProperties);
        } else {
            this.postProv.createComment(this.postProperties);
        }
    }
}
