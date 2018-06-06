import { Attribute, JsonApiModel, JsonApiModelConfig } from "angular2-jsonapi";

@JsonApiModelConfig({
  type: 'discoveries'
})

export class Discovery extends JsonApiModel {

  @Attribute({serializedName: 'name'})
  content: string;
}