import { Attribute, JsonApiModel, JsonApiModelConfig } from "angular2-jsonapi";

@JsonApiModelConfig({
    type: 'statuses'
})
export class Status extends JsonApiModel {
    @Attribute()
    name: string;
}