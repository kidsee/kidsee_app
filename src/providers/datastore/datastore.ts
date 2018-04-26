import { JsonApiDatastoreConfig, JsonApiDatastore, DatastoreConfig } from 'angular2-jsonapi';
import { User } from '../../app/models/user';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Post } from "../../app/models/post";
import { Comment } from "../../app/models/comment";
import { Status } from "../../app/models/status";
import { ContentType } from "../../app/models/contentType";
import { Location } from '../../app/models/location';

const config: DatastoreConfig = {
  baseUrl: 'http://128.199.32.227/api',
  models: {
    users: User,
    posts: Post,
    comments: Comment,
    statuses: Status,
    'content-types': ContentType,
    locations: Location
  }
};

@Injectable()
@JsonApiDatastoreConfig(config)
export class Datastore extends JsonApiDatastore {

  constructor(http: Http) {
    super(http);
  }

  public getBaseUrl() {
    return this.datastoreConfig.baseUrl;
  }
}
