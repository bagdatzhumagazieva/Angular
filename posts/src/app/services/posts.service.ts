import { Injectable } from '@angular/core';
import {IComment, IPost, IUser, IUserReg} from '../modules';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {

  constructor(private http: HttpClient, private router: Router) {
  }

  token = localStorage.getItem('token') || '';

  getPost = (userId?: number) => {
    return this.http.get(
      `http://localhost:3000/posts${userId ? `?userId=${userId}` : ''}`,
      {
        headers: {
          Authorization: this.token,
        }
      },
    );
  }

  getPostComment = (postId: number) => {
    return this.http.get(`http://localhost:3000/posts/${postId}/comments`, {
      headers: {
          Authorization: this.token,
        }
      },
    );
  }

  addPost = (post: IPost) => {
    return this.http.post(
      `http://localhost:3000/posts/`,
      post,
      {
        headers: {
          Authorization: this.token,
        }
      },
    );
  }

  addComment = (comment: IComment) => {
    return this.http.post(
      `http://localhost:3000/posts/${comment.postId}/comments`,
      comment,
      {
        headers: {
          Authorization: this.token,
        }
      },
      );
  }

}
