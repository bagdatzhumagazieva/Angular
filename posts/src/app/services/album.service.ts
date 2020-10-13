import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {

  constructor(private http: HttpClient, private router: Router) {
  }

  token = localStorage.getItem('token') || '';

  getAlbums = (userId?: number) => {
    return this.http.get(
      `http://localhost:3000/albums${userId ? `?userId=${userId}` : ''}`,
      {
        headers: {
          Authorization: this.token,
        }
      },
    );
  }
}
