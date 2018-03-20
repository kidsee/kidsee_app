import {Attribute, JsonApiModel, JsonApiModelConfig} from "angular2-jsonapi";

@JsonApiModelConfig({
    type: 'contenttypes'
})
export class ContentType extends JsonApiModel {
    @Attribute()
    name: string;

    @Attribute()
    description: string;
}