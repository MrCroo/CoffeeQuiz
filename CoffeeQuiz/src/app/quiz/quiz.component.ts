import { Component, OnInit } from '@angular/core';
import { QuizDataService } from './../quiz-data.service';
import { AppComponent} from './../app.component'

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
  data: any = this.main.data[0];
  inputText: string = '';
  random:boolean = true;
  showSpinner: boolean = true;
  correctANSW: boolean = false;
  wrongANSW: boolean = false;
  answerTimer: number = 5;
  interval: any;
  isActive: boolean = true;
  disable: boolean = false;
  categorys: any;
  selectedCatId: number = this.main.selectedCatId;
  data2:any[] = [];
  score:number = this.main.score;
  randomNumber:number = 0;
  prevRandomNumber: number = 0;

  constructor(private quiz: QuizDataService, private main: AppComponent) {}

  ngOnInit(): void {
    this.getRandom();
    this.getCategorys();
    this.startTimer();
  }

  getRandom() {
    if (this.random) {
      this.quiz.getRandomQuiz().subscribe((result) => {
        this.data = result;
        this.data2 = [];
        this.data2.push(this.data[0]);
        this.showSpinner = false;
        this.selectedCatId = this.data2[0].category_id;
        this.random=false;
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
    this.random = true;
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
      this.main.score += this.data2[0].value;
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
      while(this.randomNumber == this.prevRandomNumber) {
        this.randomNumber = Math.floor(Math.random()*(this.data.length));
      }
      this.prevRandomNumber = this.randomNumber;
      this.data2.push(this.data[this.randomNumber
        ]);
      this.showSpinner = false;
    });
  }
}
