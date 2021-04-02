import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  {
    path: 'randomquiz',
    component: QuizComponent,
  },
  {
    path: 'quizlist',
    component: QuizListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [QuizComponent, QuizListComponent];
