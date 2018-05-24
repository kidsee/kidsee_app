import { Attribute, JsonApiModel, JsonApiModelConfig } from "angular2-jsonapi";

@JsonApiModelConfig({
  type: 'answer-types'
})
export class AnswerType extends JsonApiModel {

  @Attribute()
  name: string;

}