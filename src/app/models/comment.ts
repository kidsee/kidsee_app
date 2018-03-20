import {Attribute, JsonApiModel, JsonApiModelConfig} from "angular2-jsonapi";
import {User} from "./user";
import {Post} from "./post";
import {ContentType} from "./contentType";

@JsonApiModelConfig({
    type: 'comments'
})
export class Comment extends JsonApiModel {
    @Attribute()
    user: User;

    @Attribute()
    post: Post;

    @Attribute()
    content: string;

    @Attribute()
    type: ContentType;
}