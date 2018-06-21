import { Attribute, JsonApiModel, JsonApiModelConfig, BelongsTo } from "angular2-jsonapi";
import { AssignmentType } from "./assignmentType";
import { Location } from "./location";
import { AnswerType } from "./answerType";

@JsonApiModelConfig({
  type: 'assignments'
})
export class Assignment extends JsonApiModel {

  @Attribute()
  name: String;

  @Attribute()
  description: String;

  @BelongsTo()
  'assignment-type': AssignmentType;

  @BelongsTo()
  'answer-type': AnswerType;

  @BelongsTo()
  location: Location;

  @Attribute()
  content: String;

  @Attribute()
  completed: Boolean;

}