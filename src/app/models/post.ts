import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { User } from "./user";
import { ContentType } from "./contentType";
import { Status } from "./status";
import { Comment } from "./comment";

@JsonApiModelConfig({
  type: 'posts'
})
export class Post extends JsonApiModel {

  @Attribute()
  content: string;

  @Attribute()
  title: string;

  @BelongsTo()
  content_type: ContentType;

  @BelongsTo()
  user: User;

  @Attribute()
  status: Status;

  @HasMany()
  comments: Comment[] = [];

  @Attribute()
  created_at: Date;

  @Attribute()
  updated_at: Date;
}