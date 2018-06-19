import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { Location } from "./location";

@JsonApiModelConfig({
  type: 'themes'
})
export class Theme extends JsonApiModel {

  @Attribute()
  name: string;

  @HasMany()
  locations: Location[];

  @BelongsTo()
  location: Location;

  @Attribute()
  icon: string;
}