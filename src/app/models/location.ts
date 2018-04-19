import { JsonApiModel, JsonApiModelConfig, Attribute } from "angular2-jsonapi";

@JsonApiModelConfig({
    type: 'locations'
  })
  
export class Location extends JsonApiModel {
    @Attribute()
    name: string;

    @Attribute()
    lon: number;

    @Attribute()
    lat: number;

    @Attribute()
    description: string;

    @Attribute()
    address: string;
}
