import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  answer: string = '';

  inputText: string = '';

  constructor() {}

  ngOnInit(): void {}

  addAnswer() {
    this.answer = this.inputText;
    this.inputText = '';
    console.log(this.answer);
  }
}
