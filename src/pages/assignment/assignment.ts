import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AssignmentServiceProvider } from '../../providers/assignment-service/assignment-service';
import { Assignment } from '../../app/models/assignment';
import { AssignmentTypeServiceProvider } from '../../providers/assignment-type-service/assignment-type-service';
import { AssignmentType } from '../../app/models/assignmentType';

@IonicPage()
@Component({
  selector: 'page-assignment',
  templateUrl: 'assignment.html'
})

export class AssignmentPage {

  protected assignments : Assignment[] = [];
  protected types : AssignmentType[] = [];
  protected selectedType: AssignmentType;

  constructor(
    private navController: NavController,
    private assignmentService: AssignmentServiceProvider,
    private assignmentTypeService: AssignmentTypeServiceProvider
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
    this.assignments.length = 0
    this.fetchAssignments(type.id);
  };

  protected goToDetailPage(assignment: Assignment) {
    this.navController.push('AssignmentDetailPage', {
      assignment: assignment,
      type: assignment['assignment-type']
    });
  };

  protected back() {
    this.navController.pop();
  }
}
