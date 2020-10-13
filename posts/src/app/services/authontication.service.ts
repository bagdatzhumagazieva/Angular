import { Injectable } from '@angular/core';
import { IUser, IUserReg } from '../modules';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) {
  }

  isAuthorized = () => {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/auth');
    }
  }

  signIn = (user: IUser) => {
    return this.http.post('http://localhost:3000/sign-in/', user).subscribe((data: any) => {
        this.router.navigateByUrl('/all-posts');
        localStorage.setItem('token', data?.accessToken);
      }
    );
  }

  getUsers = () => {
    return this.http.get('http://localhost:3000/users/');
  }

  register = (user: IUserReg) => {
    return this.http.post('http://localhost:3000/users/', user).subscribe((data: any) =>
      this.router.navigateByUrl('/auth')
    );
  }

  signOut = () => {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth');
  }
}
