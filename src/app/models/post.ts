import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { User } from "./user";
import { ContentType } from "./contentType";
import { PostStatus } from "./poststatus";
import { Comment } from "./comment";

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

    @BelongsTo()
    user: User;

    @Attribute()
    postStatus: PostStatus;

    @HasMany()
    comments: Comment[] = [];

    @Attribute()
    created_at: Date;

    @Attribute()
    updated_at: Date;
}