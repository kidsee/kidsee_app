import { Injectable } from "@angular/core";
import { Assignment } from "../../app/models/assignment";
import { Datastore } from "../datastore/datastore";

@Injectable()
export class AssignmentServiceProvider {

  constructor(private datastore: Datastore) { }

  public assignments(params: {}) {
    return this.datastore.findAll(Assignment, params);
  }

}