import { Component, OnInit } from '@angular/core';
import { QuizDataService } from '../quiz-data.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css'],
})
export class QuizListComponent implements OnInit {
  data: any;
  selected: string = '';

  constructor(private quiz: QuizDataService) {}

  ngOnInit(): void {
    this.getQuizlist();
  }

  getQuizlist() {
    this.quiz.get100Quiz(100).subscribe((result) => {
      this.data = result;
    });
  }

  getCat() {
    this.quiz.getCategorys(100).subscribe((result) => {
      this.data = result;
    });
  }

  refresh() {
    this.getQuizlist();
  }
}
