import { Attribute, JsonApiModel, JsonApiModelConfig } from "angular2-jsonapi";

@JsonApiModelConfig({
  type: 'assignment-types'
})
export class AssignmentType extends JsonApiModel {
  @Attribute()
  name: string;
}