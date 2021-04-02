import { Component, OnInit } from '@angular/core';
import { QuizDataService } from '../quiz-data.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css'],
})
export class QuizListComponent implements OnInit {
  data: any;

  constructor(private quiz: QuizDataService) {}

  ngOnInit(): void {
    this.getQuizlist();
  }

  getQuizlist() {
    this.quiz.get100Quiz(100).subscribe((result) => {
      this.data = result;
    });
  }
}
