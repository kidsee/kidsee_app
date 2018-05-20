import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { User } from "./user";
import { ContentType } from "./contentType";
import { Status } from "./status";
import { Comment } from "./comment";
import { Location } from "./location";

@JsonApiModelConfig({
  type: 'posts'
})
export class Post extends JsonApiModel {

  @Attribute()
  content: string;

  @Attribute()
  title: string;

  @BelongsTo()
  location: Location;

  @BelongsTo()
  content_type: ContentType;

  @BelongsTo()
  user: User;

  @BelongsTo()
  status: Status;

  @HasMany()
  comments: Comment[];

  @Attribute()
  created_at: Date;

  @Attribute()
  updated_at: Date;

  @Attribute()
  rating: number;
}