import { JsonApiModelConfig, JsonApiModel, Attribute, BelongsTo } from 'angular2-jsonapi';

@JsonApiModelConfig({
  type: 'locations'
})
export class Location extends JsonApiModel {

  @Attribute()
  name: string;

  @Attribute()
  description: string;

  @Attribute()
  address: string;

  @Attribute()
  lon: number;

  @Attribute()
  lat: number;
}