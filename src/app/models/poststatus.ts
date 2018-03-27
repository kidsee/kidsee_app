import { Attribute, JsonApiModel, JsonApiModelConfig } from "angular2-jsonapi";

@JsonApiModelConfig({
    type: 'post_statuses'
})
export class PostStatus extends JsonApiModel {
    @Attribute()
    name: string;
}