import { Injectable } from '@angular/core';
import { Datastore } from '../datastore/datastore';
import { UserAnswer } from '../../app/models/userAnswer';

@Injectable()
export class UserAnswerServiceProvider {

  constructor(private datastore: Datastore) { }

  public createAnswer(data) {
    return this.datastore.createRecord(UserAnswer, data).save();
  }
}
