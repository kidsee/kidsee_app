import { Injectable } from '@angular/core';
import { Discovery } from "../../app/models/discovery";
import { Datastore } from "../datastore/datastore";
import {DiscoveryAssignment} from "../../app/models/discoveryAssignment";

@Injectable()
export class DiscoveryService {

  constructor(private datastore: Datastore) { }

  public discoveries(params: {}) {
    return this.datastore.findAll(Discovery, params);
  }

  public discoveryAssignments(params: {}){
    return this.datastore.findAll(DiscoveryAssignment, params);
  }
}
