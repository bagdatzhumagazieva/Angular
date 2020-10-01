import { Component, OnInit } from '@angular/core';
import {FillAnswer, Quiz} from '../models';

@Component({
  selector: 'app-fill-quiz',
  templateUrl: './fill-quiz.component.html',
  styleUrls: ['./fill-quiz.component.scss']
})
export class FillQuizComponent implements OnInit {

  constructor() { }

  questions: Quiz[] = JSON.parse(localStorage.getItem('questions')) || [];
  answers: FillAnswer[] = JSON.parse(localStorage.getItem('answers')) || [];
  result = 0;
  isFinished = JSON.parse(localStorage.getItem('isFinished')) || false;

  time = 60;
  interval;

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer() {
    // this.play = true;
    this.interval = setInterval(() => {
      this.time--;
    }, 1000);
  }

  pauseTimer() {
    // this.play = false;
    clearInterval(this.interval);
  }

  handleChangeRadio = (e: any, questionId: number, answerId: number) => {
    const newAnswer = {
      questionId,
      answerIds: [{
        id: answerId,
        isCorrect: false,
      }],
    };
    this.answers.filter(n => n.questionId === questionId).length === 0 ?
    this.answers = [...this.answers, newAnswer] :
      this.answers[this.answers.findIndex(n => n.questionId === questionId)] = newAnswer;
  }

  handleChangeCheckbox = (e: any, questionId: number, answerId: number) => {
    const newAnswer = {
      questionId,
      answerIds: e.target.checked ? [{
        id: answerId,
        isCorrect: false,
      }] : [],
    };
    const newAnswers = this.answers.map(n => n.questionId === questionId
      ? {...n, answerIds: e.target.checked ?
          [...n.answerIds, {id: answerId, isCorrect: false}]
          : n.answerIds.filter(o => o.id !== answerId)} : n);
    this.answers.filter(n => n.questionId === questionId).length === 0 ?
      this.answers = [...this.answers, newAnswer] :
      this.answers = newAnswers;
  }

  submit = () => {
    const result =
    this.answers.map(e =>
      ({...e,
        answerIds: e.answerIds.map(p =>
            ({...p,
              isCorrect:
              this.questions[e.questionId].answerOptions.find(l => l.id === p.id + 1)?.isCorrect}))
      })
    );
    this.answers = result;
    this.isFinished = true;
    localStorage.setItem('isFinished', 'true');
    localStorage.setItem('answers', JSON.stringify(this.answers));
  }

  isCorrectAnswer = (questionId: number, answerId: number) => {
    return this.answers.find(e => e.questionId === questionId)
      .answerIds.find(l => l.id === answerId)?.isCorrect;
  }

  isClickedAnswer = (questionId: number, answerId: number) => {
    return this.answers.find(e => e.questionId === questionId)
      .answerIds.find(l => l.id === answerId);
}

}
