import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {AnswerOption, Quiz, QuizType} from '../models';

@Component({
  selector: 'app-admin-quiz',
  templateUrl: './admin-quiz.component.html',
  styleUrls: ['./admin-quiz.component.scss']
})
export class AdminQuizComponent implements OnInit {

  questionId = -1;
  questions: Quiz[] = JSON.parse(localStorage.getItem('questions')) || [];

  radioControl = new FormControl(1);


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onAddQuestion = () => {
    this.questionId ++;
    const newQuestion: Quiz = {
      id: this.questionId,
      text: '',
      type: 'single',
      answerOptions: [
        {
          id: 1,
          text: '',
          isCorrect: true,
        },
        {
          id: 2,
          text: '',
          isCorrect: false,
        },
        {
          id: 3,
          text: '',
          isCorrect: false,
        },
        {
          id: 4,
          text: '',
          isCorrect: false,
        },
      ],
    };
    this.questions = [...this.questions, newQuestion];
  }

  chooseType = (id: number, type: QuizType) => {
    this.questions[id].type = type;
  }

  onDelQuestion = (id: number) => {
    const newQuestions = this.questions.filter((e, i) => i !== id);
    this.questions = newQuestions;
  }

  handleChangeRadio = (e: any, questionId: number, answerId: number) => {
    const newQuestion = this.questions.map((n, ind) => ind === questionId ?
      {...n, answerOptions: n.answerOptions.map((p, i) => ({...p, isCorrect: i === answerId}))} : n);
    this.questions = newQuestion;
  }

  handleChangeCheckbox = (e: any, questionId: number, answerId: number) => {
    this.questions[questionId].answerOptions[answerId].isCorrect = e.target.checked;
  }

  handleSaveQuestions = () => {
    localStorage.setItem('questions', JSON.stringify(this.questions));
    this.router.navigateByUrl('/');
  }

  modelChanged = (e, questionId: number, answerId: number) => {
    const newQuestion = this.questions.map((n, ind) => ind === questionId ?
      {...n, answerOptions: n.answerOptions.map((p, i) => (
          i === answerId ? {...p, text: e.target.value} : p))} : n);
    this.questions = newQuestion;
  }
}
