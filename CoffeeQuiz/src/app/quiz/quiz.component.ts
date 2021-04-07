import { Component, OnInit } from '@angular/core';
import { QuizDataService } from './../quiz-data.service';

export interface One {
  airdate: string;
  answer: string;
  category: {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
    clues_count: number;
  };
  category_id: number;
  created_at: string;
  game_id: number;
  id: number;
  invalid_count: number;
  question: string;
  updated_at: string;
  value: number;
}

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
  categorys: any;
  selectedCatId: number = 0;
  data2:any[] = [];

  constructor(private quiz: QuizDataService) {}

  ngOnInit(): void {
    this.getRandom();
    this.getCategorys();
    this.startTimer();
  }

  getRandom() {
    if (this.selectedCatId == 0) {
      this.quiz.getRandomQuiz().subscribe((result) => {
        this.data = result;
        this.data2 = [];
        this.data2.push(this.data[0]);
        this.showSpinner = false;
        this.selectedCatId = this.data2[0].category_id;
      });
    } else this.getCat();
  }

  getCategorys() {
    this.quiz.getCategorys(100).subscribe((result) => {
      this.categorys = result;
    });
  }

  startTimer() {
    if (this.isActive) {
      this.interval = setInterval(() => {
        if (this.answerTimer > 0) {
          this.answerTimer--;
        }
        this.isActive = false;
        if (this.answerTimer <= 0) {
          clearInterval(this.interval);
          this.isActive = false;
        }
      }, 1000);
    }
  }

  randomQuestion() {
    this.selectedCatId = 0;
    this.newQuestion();
  }

  newQuestion() {
    this.correctANSW = false;
    this.wrongANSW = false;
    this.getRandom();
    this.answerTimer = 2;
    this.isActive = true;
    clearInterval();
    this.startTimer();
    this.disable = false;
  }

  addAnswer() {
    this.answer = this.inputText.toLowerCase().replace(' ', '');
    if (this.data2[0].answer.toLowerCase().replace(' ', '') == this.answer) {
      this.score += this.data2[0].value;
      this.correctANSW = true;
      this.disable = true;
    } else {
      this.wrongANSW = true;
    }
    this.inputText = '';
  }

  getCat() {
    this.quiz.getCatById(this.selectedCatId).subscribe((result) => {
      this.data = result;
      this.data2 = [];
      this.data2.push(this.data[Math.floor(Math.random()*(this.data.length))]);
      this.showSpinner = false;
    });
  }
}
