import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {RegisterComponent} from './register/register.component';
import {AllPostsComponent} from './pages/all-posts/all-posts.component';
import {MyPostsComponent} from './pages/create-post/my-posts.component';
import {AlbumsComponent} from './pages/albums/albums.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'all-posts',
    component: AllPostsComponent,
  },
  {
    path: 'create-post',
    component: MyPostsComponent,
  },
  {
    path: 'albums',
    component: AlbumsComponent,
  },
  {
    path: 'albums/:id',
    component: AlbumsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
