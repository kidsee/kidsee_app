import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany } from 'angular2-jsonapi';
import { Location } from "./location";

@JsonApiModelConfig({
  type: 'themes'
})
export class Theme extends JsonApiModel {

  @Attribute()
  name: string;

  @HasMany()
  locations: Location[];
}