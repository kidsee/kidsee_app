import { JsonApiModelConfig, JsonApiModel, BelongsTo } from 'angular2-jsonapi';
import { User } from './user';
import { Assignment } from './assignment';

@JsonApiModelConfig({
  type: 'user-assignments'
})
export class UserAssignment extends JsonApiModel {

  @BelongsTo()
  user: User;

  @BelongsTo()
  assignment: Assignment;

}