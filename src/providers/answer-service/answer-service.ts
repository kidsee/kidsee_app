import { Injectable } from '@angular/core';
import { Datastore } from "../datastore/datastore";
import { Answer } from '../../app/models/answer';

@Injectable()
export class AnswerServiceProvider {

  constructor(private datastore: Datastore) { }

  public answers(params: {}) {
    return this.datastore.findAll(Answer, params);
  }

}
