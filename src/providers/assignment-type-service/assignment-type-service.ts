import { Injectable } from '@angular/core';
import { Datastore } from "../datastore/datastore";
import { AssignmentType } from "../../app/models/assignmentType";

@Injectable()
export class AssignmentTypeServiceProvider {

  constructor(private datastore: Datastore) { }

  public assignmentTypes(params: {}) {
    return this.datastore.findAll(AssignmentType);
  }
}