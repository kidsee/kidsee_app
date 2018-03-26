import { Attribute, JsonApiModel, JsonApiModelConfig } from "angular2-jsonapi";

@JsonApiModelConfig({
    type: 'poststatusses'
})
export class PostStatus extends JsonApiModel {
    @Attribute()
    name: string;
}