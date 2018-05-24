import { JsonApiModelConfig, JsonApiModel, Attribute, BelongsTo } from 'angular2-jsonapi';
import { User } from './user';
import { Assignment } from './assignment';
import { Answer } from './answer';

@JsonApiModelConfig({
  type: 'user-answers'
})
export class UserAnswer extends JsonApiModel {

  @BelongsTo()
  user: User;

  @BelongsTo()
  assignment: Assignment;

  @BelongsTo()
  answer: Answer;

  @Attribute()
  correct_answer: Boolean;
}