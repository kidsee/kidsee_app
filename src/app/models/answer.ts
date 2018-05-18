import { Attribute, JsonApiModel, JsonApiModelConfig, BelongsTo } from "angular2-jsonapi";
import { Assignment } from "./assignment";

@JsonApiModelConfig({
  type: 'answers'
})
export class Answer extends JsonApiModel {

  @Attribute()
  answer: String;

  @Attribute()
  correctAnswer: Boolean;

  @BelongsTo()
  assignment: Assignment;

}