import { Injectable } from '@angular/core';
import { Datastore } from '../datastore/datastore';
import { UserAssignment } from '../../app/models/userAssignment';

@Injectable()
export class UserAssignmentServiceProvider {

  constructor(private datastore: Datastore) { }

  public assignments(params: {}) {
    return this.datastore.findAll(UserAssignment, params);
  }
}
