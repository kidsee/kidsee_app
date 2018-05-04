import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { User } from "./user";
import { ContentType } from "./contentType";
import { Status } from "./status";
import { Comment } from "./comment";
import { Location } from "./location";

@JsonApiModelConfig({
  type: 'ratings'
})
export class Rating extends JsonApiModel {

  @Attribute()
  content: string;

  @Attribute()
  object_type: string;

  @Attribute()
  object_id: number;

  @Attribute()
  rating: number;

  @Attribute()
  description: string;

  @BelongsTo()
  user: User;

  @Attribute()
  created_at: Date;

  @Attribute()
  updated_at: Date;
}