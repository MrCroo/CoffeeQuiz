import { Component, OnInit } from '@angular/core';
import { QuizDataService } from './../quiz-data.service';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  answer: string = '';
  data: any;
  inputText: string = '';
  showSpinner: boolean = true;
  score: number = 0;
  correctANSW: boolean = false;
  wrongANSW: boolean = false;
  answerTimer: number = 5;
  interval: any;
  isActive: boolean = true;
  disable: boolean = false;

  constructor(private quiz: QuizDataService) {}

  ngOnInit(): void {
    this.getData();
    this.startTimer();
  }

  getData() {
    this.quiz.getQuiz().subscribe((result) => {
      this.data = result;
      this.showSpinner = false;
      console.log(this.data[0].answer);
    });
  }

  startTimer() {
    if (this.isActive) {
      this.interval = setInterval(() => {
        if (this.answerTimer > 0) {
          this.answerTimer--;
        }
        console.log('1');
        if (this.answerTimer == 0) {
          clearInterval(this.interval);
          this.isActive = false;
        }
      }, 1000);
    }
  }

  resetStatus() {
    this.wrongANSW = false;
  }

  newQuestion() {
    this.correctANSW = false;
    this.wrongANSW = false;
    this.getData();
    this.answerTimer = 5;
    this.isActive = true;
    this.startTimer();
    this.disable = false;
  }

  addAnswer() {
    this.answer = this.inputText.toLowerCase();
    if (this.data[0].answer.toLowerCase() == this.answer) {
      console.log('CORRECT ANSWER');
      this.score += this.data[0].value;
      this.correctANSW = true;
      this.disable = true;
    } else {
      console.log('Wrong Answer');
      this.wrongANSW = true;
    }
    this.inputText = '';
  }
}
