import { Attribute, JsonApiModel, JsonApiModelConfig, BelongsTo } from "angular2-jsonapi";

@JsonApiModelConfig({
  type: 'location-types'
})
export class LocationType extends JsonApiModel {
  @Attribute()
  name: string;

  @Attribute()
  description: string;

  @BelongsTo()
  location: Location;
}