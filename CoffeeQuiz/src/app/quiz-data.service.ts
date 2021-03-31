import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuizDataService {
  url: string = 'http://jservice.io/api/random';

  constructor(private http: HttpClient) {}

  getQuiz() {
    return this.http.get(this.url);
  }
}
