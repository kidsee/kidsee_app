import { JsonApiDatastoreConfig, JsonApiDatastore, DatastoreConfig } from 'angular2-jsonapi';
import { User } from '../../app/models/user';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Post } from "../../app/models/post";
import { Comment } from "../../app/models/comment";
import { Status } from "../../app/models/status";
import { ContentType } from "../../app/models/contentType";
import { Location } from '../../app/models/location';
import { Theme } from '../../app/models/theme';
import { LocationType } from '../../app/models/locationType';
import { Assignment } from '../../app/models/assignment';
import { AssignmentType } from '../../app/models/assignmentType';
import { Answer } from '../../app/models/answer';
import { UserAnswer } from '../../app/models/userAnswer';
import { AnswerType } from '../../app/models/answerType';
import { PostType } from "../../app/models/postType";
import { Discovery } from "../../app/models/discovery";
import { DiscoveryAssignment } from "../../app/models/discoveryAssignment";

const config: DatastoreConfig = {
  baseUrl: 'http://128.199.32.227/api',
  models: {
    users: User,
    posts: Post,
    comments: Comment,
    statuses: Status,
    'content-types': ContentType,
    'location-types': LocationType,
    locations: Location,
    themes: Theme,
    assignments: Assignment,
    'assignment-types': AssignmentType,
    answers: Answer,
    'user-answers': UserAnswer,
    'answer-types': AnswerType,
    'post-types': PostType,
    discoveries: Discovery,
    'discovery-assignments': DiscoveryAssignment
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
