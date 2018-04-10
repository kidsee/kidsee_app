import { Attribute, JsonApiModel, JsonApiModelConfig } from "angular2-jsonapi";

@JsonApiModelConfig({
  type: 'postStatuses'
})
export class PostStatus extends JsonApiModel {
  @Attribute()
  name: string;
}