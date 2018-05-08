import { Attribute, BelongsTo, JsonApiModel, JsonApiModelConfig } from "angular2-jsonapi";
import { User } from "./user";

@JsonApiModelConfig({
  type: 'ratings'
})
export class Rating extends JsonApiModel {

  @Attribute()
  content: string;

  @Attribute({ serializedName: 'object-type' })
  object_type: string;

  @Attribute({ serializedName: 'object-id' })
  object_id: string;

  @Attribute()
  rating: number;

  @Attribute()
  description: string;

  @BelongsTo()
  user: User;

  @Attribute({ serializedName: 'created-at' })
  created_at: Date;

  @Attribute({ serializedName: 'updated-at' })
  updated_at: Date;

  @BelongsTo()
  location: Location;

}
