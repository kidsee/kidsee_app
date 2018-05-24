import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Answer } from '../../app/models/answer';
import { Assignment } from '../../app/models/assignment';
import { AnswerServiceProvider } from '../../providers/answer-service/answer-service';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { UserAnswerServiceProvider } from '../../providers/user-answer-service/user-answer-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'answer-type-number',
  templateUrl: 'answer-type-number.html'
})

export class AnswerTypeNumberComponent {
  protected filledAnswer: String;
  protected assignmentId: Number;
  protected answers: Answer[]=[];
  public assignment: Assignment;

  constructor(
    private navController: NavController,
    private answerService: AnswerServiceProvider,
    private alertService: AlertServiceProvider,
    private userAnswerService: UserAnswerServiceProvider,
    private authService: AuthServiceProvider,
    private navParams: NavParams,
    private translateService: TranslateService
  ) { }

  ngAfterContentInit() {
    this.assignment = this.navParams.get('assignment');
    if(this.assignment){
      this.fetchAnswer(Number(this.assignment.id));
    }
  }

  private goToAssignments() {
    this.navController.push('AssignmentPage');
  }

  private fetchAnswer(id: Number) {
    this.answerService.answers({filter: {assignment_id: id}}).subscribe(
      answers => {
        answers.getModels().forEach(answer => {
          this.answers.push(answer);
        });
      }
    )
  }

  protected saveAnswer() {
    let correct;
    if(this.filledAnswer == this.answers[0].answer){
      this.translateService.get([
        'popup_title_succes',
        'popup_text_succes',
        'ok']
      ).subscribe(translations => {
        this.alertService.showPopupWithHandler(
          translations.popup_title_succes,
          translations.popup_text_succes,
          translations.ok,  _ => {
            this.goToAssignments();
        });
      });
      correct = true;
    } else {
      this.translateService.get([
        'popup_title_fail',
        'popup_text_fail',
        'ok']
      ).subscribe(translations => {
        this.alertService.showPopupWithHandler(
          translations.popup_title_fail,
          translations.popup_text_fail,
          translations.ok, _ =>{
            this.goToAssignments();
        });
      });
      correct = false;
    }
    this.authService.fetchCurrentUser().then(user => {
      this.userAnswerService.createAnswer({
        assignment: this.assignment,
        answer: this.answers[0],
        correct_answer: correct,
        user: user
      }).subscribe();
    })
  }
}
