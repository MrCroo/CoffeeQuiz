import { Component, OnInit } from '@angular/core';
import { QuizDataService } from './../quiz-data.service';
import { AppComponent} from './../app.component'

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  answer: string = '';
  data: any = this.main.data[0];
  inputText: string = '';
  showSpinner: boolean = true;
  correctANSW: boolean = false;
  wrongANSW: boolean = false;
  answerTimer: number = 2;
  interval: any;
  isActive: boolean = true;
  disable: boolean = false;
  categorys: any;
  selectedCatId: number = this.main.selectedCatId;
  data2:any[] = [];
  score:number = 0;
  randomNumber:number = 0;
  prevRandomNumber: number = 0;
  random:boolean = this.main.random;
  selectedQuestion:boolean = this.main.selectedQuestion;

  constructor(private quiz: QuizDataService, private main: AppComponent) {}

  ngOnInit(): void {
    this.start();
    this.getCategorys();
    this.startTimer();
  }

  start() {
    if (this.random) {
      this.getRandom();
    } else if(this.selectedQuestion) {
      this.getSelected();
    } else {
      this.getCat();
    }
  }

  getSelected() {
    this.data2 = [];
    this.data2.push(this.data);
    this.showSpinner = false;
    this.selectedQuestion = false;
    this.random = false;
  }

  getRandom() {
    this.quiz.getRandomQuiz().subscribe((result) => {
      this.data = result;
      this.data2 = [];
      this.data2.push(this.data[0]);
      this.showSpinner = false;
      this.selectedCatId = this.data2[0].category_id;
      this.random=false;
    });
  }

  async getCategorys() {
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
    this.start();
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

  points() {
    return this.score = this.main.score;
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
