import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AssignmentServiceProvider } from '../../providers/assignment-service/assignment-service';
import { Assignment } from '../../app/models/assignment';
import { AssignmentTypeServiceProvider } from '../../providers/assignment-type-service/assignment-type-service';
import { AssignmentType } from '../../app/models/assignmentType';
import { UserAssignmentServiceProvider } from '../../providers/user-assignment-service/user-assignment-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User } from '../../app/models/user';
import { UserAssignment } from '../../app/models/userAssignment';

@IonicPage()
@Component({
  selector: 'page-assignment',
  templateUrl: 'assignment.html'
})

export class AssignmentPage {

  protected assignments : Assignment[] = [];
  protected types : AssignmentType[] = [];
  protected selectedType: AssignmentType;
  protected currentUser: User;
  protected doneAssignemnts: UserAssignment[] = [];

  constructor(
    private navController: NavController,
    private assignmentService: AssignmentServiceProvider,
    private assignmentTypeService: AssignmentTypeServiceProvider,
    private doneAssignmentService: UserAssignmentServiceProvider,
    private authServiceProvider: AuthServiceProvider
  ) { }

  ionViewDidEnter() {
    this.authServiceProvider.fetchCurrentUser().then(user => {
      this.currentUser = user;
      this.fetchDoneAssignments();
    });
  }

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

  private fetchDoneAssignments(){
    console.log('user', this.currentUser.id)
    this.doneAssignmentService.assignments({filter: {user: this.currentUser}}).subscribe(
      userassignments => {
        userassignments.getModels().forEach(userassignment => {
          this.doneAssignemnts.push(userassignment);
          console.log(userassignment);
        });
      }
    )
  }

  protected checkAssignmentDone(assignment: Assignment){
    // console.log('chaeck', assignment);
    this.doneAssignemnts.forEach(element => {
      console.log('element', element)
      if(element.assignment.id == assignment.id){
        console.log('true')
        return true;
      }
    });
    console.log('false')
    return false;
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
