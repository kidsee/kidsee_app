import { JsonApiModelConfig, JsonApiModel, Attribute } from 'angular2-jsonapi';

@JsonApiModelConfig({
    type: 'users'
})
export class User extends JsonApiModel {

    @Attribute()
    username: string;
    
    @Attribute()
    password: string;
    
    @Attribute()
    email: string;
    
    @Attribute()
    birthdate: Date;
    
    @Attribute()
    school: string;
    
    @Attribute()
    city: string;
    
    @Attribute()
    avatar: string;
    
    @Attribute()
    created_at: Date;

    @Attribute()
    updated_at: Date;
}