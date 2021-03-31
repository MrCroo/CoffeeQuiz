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

  constructor(private quiz: QuizDataService) {}

  ngOnInit(): void {
    this.quiz.getQuiz().subscribe((result) => {
      this.data = result;
      this.showSpinner = false;
      console.log(this.data[0].answer);
    });
  }

  addAnswer() {
    this.answer = this.inputText;
    if (this.data[0].answer == this.answer) {
      console.log('CORRECT ANSWER');
      this.score += this.data[0].value;
      this.correctANSW = true;
    } else {
      console.log('Wrong Answer');
      this.wrongANSW = true;
    }
    this.inputText = '';
  }
}
