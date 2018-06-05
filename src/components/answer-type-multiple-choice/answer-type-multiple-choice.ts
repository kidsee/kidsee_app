import { Component } from '@angular/core';
import { AnswerServiceProvider } from '../../providers/answer-service/answer-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NavParams, NavController } from 'ionic-angular';
import { Assignment } from '../../app/models/assignment';
import { TranslateService } from '@ngx-translate/core';
import { Answer } from '../../app/models/answer';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { UserAnswerServiceProvider } from '../../providers/user-answer-service/user-answer-service';

/**
 * Generated class for the AnswerTypeMultipleChoiceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'answer-type-multiple-choice',
  templateUrl: 'answer-type-multiple-choice.html'
})
export class AnswerTypeMultipleChoiceComponent {

  public assignment: Assignment;
  protected answers: Answer[]=[];
  protected filledAnswer: Answer;
  protected selection: any;
  protected rightAnswer: Answer;
  

  constructor(
    private navController: NavController,
    private answerService: AnswerServiceProvider,
    private authService: AuthServiceProvider,
    private navParams: NavParams,
    private alertService: AlertServiceProvider,
    private translateService: TranslateService,
    private userAnswerService: UserAnswerServiceProvider
  ) { }

  ngAfterContentInit() {
    this.assignment = this.navParams.get('assignment');
    if(this.assignment){
      this.fetchAnswer(Number(this.assignment.id));
    }
    if(this.answers != null){
      this.checkAnswer();
    }
  }

  private checkAnswer(){
    this.answers.forEach(answer => {
      if(answer.correctAnswer){
        this.rightAnswer = answer;
        console.log('bla', answer);
        return;
      }
      console.log('bla', answer);
    });
  }

  protected setAnswer(answer: Answer){
    this.filledAnswer = answer;
    this.saveAnswer();
  }

  private goToAssignments() {
    this.navController.pop();
  }

  private fetchAnswer(id: Number) {
    console.log('id', id)
    this.answerService.answers({filter: {assignment_id: id}}).subscribe(
      answers => {
        answers.getModels().forEach(answer => {
          this.answers.push(answer);
          console.log('answer', answer);
        });
      }
    )
  }

  protected saveAnswer() {
    let correct;
    if(this.filledAnswer == this.rightAnswer){
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
