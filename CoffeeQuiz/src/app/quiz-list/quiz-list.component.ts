import { Component, OnInit } from '@angular/core';
import { QuizDataService } from '../quiz-data.service';
import { AppComponent} from './../app.component'

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css'],
})
export class QuizListComponent implements OnInit {
  data: any;
  showSpinner: boolean = true;

  constructor(private quiz: QuizDataService, private main: AppComponent) {}

  ngOnInit(): void {
    this.getQuizlist();
    
  }

  getQuizlist() {
    this.quiz.get100Quiz(100).subscribe((result) => {
      this.data = result;
      this.showSpinner = false;
    });
  }

  chosenQ(value:any) {
    this.main.data = [];
    this.main.data.push(value);
    this.main.selectedCatId = value.id;
    console.log(this.main.selectedCatId);
    console.log(this.main.data);
  }

  chosenCAT(value:number) {
    this.quiz.getCatById(value).subscribe((result) => {
      this.data = result;
    });
  }

  refresh() {
    this.getQuizlist();
    
  }
}
