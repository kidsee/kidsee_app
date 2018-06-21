import { Attribute, BelongsTo, JsonApiModel, JsonApiModelConfig } from "angular2-jsonapi";
import { Discovery } from "./discovery";
import { Assignment } from "./assignment";

@JsonApiModelConfig({
  type: 'discovery-assignments'
})

export class DiscoveryAssignment extends JsonApiModel {

  @Attribute()
  name: string;

  @BelongsTo()
  assignment: Assignment;

  @BelongsTo()
  discovery: Discovery;

  @Attribute({serializedName: 'sort-order'})
  sort_order: number;
}