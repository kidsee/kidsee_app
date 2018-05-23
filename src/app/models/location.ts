import { JsonApiModelConfig, JsonApiModel, Attribute, BelongsTo, HasMany } from 'angular2-jsonapi';
import { Theme } from "./theme";

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

  @Attribute({serializedName: 'website-link'})
  websiteLink: string;

  @BelongsTo()
  theme: Theme;

  @HasMany()
  themes: Theme[];
}