import { JsonApiModelConfig, JsonApiModel, Attribute } from 'angular2-jsonapi';

@JsonApiModelConfig({
  type: 'post-types'
})
export class PostType extends JsonApiModel {

  @Attribute()
  name: string;
}