import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AssignmentServiceProvider } from '../../providers/assignment-service/assignment-service';
import { AssignmentTypeServiceProvider } from '../../providers/assignment-type-service/assignment-type-service';
import { AssignmentType } from '../../app/models/assignmentType';
import { DiscoveryService } from "../../providers/discovery-service/discovery-service";
import { Assignment } from "../../app/models/assignment";

@IonicPage()
@Component({
  selector: 'page-assignment',
  templateUrl: 'assignment.html'
})

export class AssignmentPage {

  protected assignments : any[] = [];
  protected types : AssignmentType[] = [];
  protected selectedType: AssignmentType;
  protected tour: Assignment[] = [];

  constructor(
    private navController: NavController,
    private assignmentService: AssignmentServiceProvider,
    private assignmentTypeService: AssignmentTypeServiceProvider,
    private discoveryService: DiscoveryService
  ) { }

  ionViewDidLoad() {
    this.fetchTypes();
    this.fetchAssignments('1');
  }

  private fetchTypes() {
    this.assignmentTypeService.assignmentTypes({}).subscribe(
      assignmentTypes => {
        assignmentTypes.getModels().forEach(type => {
          this.types.push(type);
        });
        this.selectedType = this.types[0];
      }
    )
  }

  private fetchAssignments(id: String) {
    this.assignmentService.assignments({filter: {assignment_type_id: id}}).subscribe(
      assignments => {
        assignments.getModels().forEach(assignment => {
          this.assignments.push(assignment);
        });
      }
    )
  }

  protected selectType(type: AssignmentType) {
    this.selectedType = type;
    this.assignments.length = 0;

    if(type.name == 'ontdektocht'){
      this.discoveryService.discoveries({}).subscribe(
        assignments => {
          assignments.getModels().forEach(assignment => {
            this.assignments.push(assignment);
          });
        }
      )
    }
    else{
      this.fetchAssignments(type.id);
    }
  };

  private fetchTourAssignments(id){

    this.discoveryService.discoveryAssignments({filter: {discovery_id: id}}).subscribe(
      assignments => {
        this.tour.length = 0;
        assignments.getModels().forEach(assignment => {
          this.tour.push(assignment.assignment);
        });
        this.navController.push('AssignmentDetailPage', {
          assignment: this.tour[0],
          assignments: this.tour,
          type: this.tour[0]['assignment-type'],
          answer: this.tour[0]['answer-type']
        });
      }
    );
  }

  protected goToDetailPage(assignment: any) {
    if(!assignment.completed) {
      if (this.selectedType.name == 'ontdektocht') {
        this.fetchTourAssignments(assignment.id);
      }
      else {
        this.navController.push('AssignmentDetailPage', {
          assignment: assignment,
          type: assignment['assignment-type'],
          answer: assignment["answer-type"]
        });
      }
    }
  }

  protected back() {
    this.navController.pop();
  }
}
