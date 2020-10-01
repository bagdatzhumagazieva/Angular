import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminQuizComponent} from './admin-quiz/admin-quiz.component';
import {FillQuizComponent} from './fill-quiz/fill-quiz.component';
import {MainPageComponent} from './main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'admin',
    component: AdminQuizComponent,
  },
  {
    path: 'fill',
    component: FillQuizComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
