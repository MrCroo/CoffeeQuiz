import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuizDataService {
  rootUrl: string = 'http://jservice.io/api/';
  random: string = 'random';
  categories: string = 'categories?count=';
  catById: string = 'clues?category=';
  randomQuizes: string = 'random?count=';

  constructor(private http: HttpClient) {}

  getRandomQuiz() {
    return this.http.get(this.rootUrl + this.random);
  }

  getCategorys(howManyAtOnce: number) {
    return this.http.get(this.rootUrl + this.categories + howManyAtOnce);
  }

  getCatById(id: number) {
    return this.http.get(this.rootUrl + this.catById + id);
  }

  get100Quiz(howManyAtOnce: number) {
    return this.http.get(this.rootUrl + this.randomQuizes + howManyAtOnce);
  }
}
