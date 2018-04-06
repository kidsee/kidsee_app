import { Attribute, JsonApiModel, JsonApiModelConfig, BelongsTo } from "angular2-jsonapi";
import { User } from "./user";
import { Post } from "./post";
import { ContentType } from "./contentType";

@JsonApiModelConfig({
  type: 'comments'
})
export class Comment extends JsonApiModel {
  @BelongsTo()
  user: User;

  @BelongsTo()
  post: Post;

  @Attribute()
  content: string;

  @Attribute()
  type: ContentType;
}