import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Assignment } from '../../app/models/assignment';
import { AssignmentType } from '../../app/models/assignmentType';
import { AssignmentTypeServiceProvider } from '../../providers/assignment-type-service/assignment-type-service';
import { AnswerType } from '../../app/models/answerType';

@IonicPage()
@Component({
  selector: 'page-assignment-detail',
  templateUrl: 'assignment-detail.html',
})

export class AssignmentDetailPage {

  protected assignmentType: AssignmentType;
  protected assignment: Assignment;
  protected answerType: AnswerType;

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    public assignmentTypeService: AssignmentTypeServiceProvider
  ) {
    this.assignment = this.navParams.get('assignment');
    this.assignmentType = this.navParams.get('type');
    this.answerType = this.navParams.get('answer');
    console.log('anser', this.answerType);
  }

  protected back() {
    this.navController.pop();
  }
}
