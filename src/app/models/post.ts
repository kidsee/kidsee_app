import { JsonApiModelConfig, JsonApiModel, Attribute } from 'angular2-jsonapi';
import { User } from "./user";
import { ContentType } from "./contentType";
import {PostStatus} from "./poststatus";
import {Comment} from "./comment";

@JsonApiModelConfig({
    type: 'posts'
})
export class Post extends JsonApiModel {

    @Attribute()
    content: string;

    @Attribute()
    title: string;

    @Attribute()
    type: ContentType;

    @Attribute()
    user: User;

    @Attribute()
    postStatus: PostStatus;

    @Attribute()
    comments: Comment[] = [];

    @Attribute()
    created_at: Date;

    @Attribute()
    updated_at: Date;
}