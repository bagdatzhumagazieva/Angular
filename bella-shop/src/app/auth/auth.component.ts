import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {IAuth} from '../models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLogin = false;
  username = '';
  password = '';
  accountList: IAuth[] = [
    ...JSON.parse(localStorage.getItem('accounts')) || [],
    {
      username: 'admin',
      password: 'admin',
    }];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isLogin = window.location.search.split('=')[1] === 'login';
  }

  onClickAuth = () => {
    if (this.isLogin) {
      if (this.accountList.findIndex(e => e.username === this.username && e.password === this.password) === -1) {
        alert('Your login or password is incorrect, please try again');
      } else {
        if (this.username === 'admin' && this.password === 'admin') {
          localStorage.setItem('admin', JSON.stringify('done'));
        }
        localStorage.setItem('authorized', JSON.stringify('done'));
        this.router.navigateByUrl('/');
      }
    } else {
      if (this.accountList.findIndex(e => e.username === this.username && e.password === this.password) !== -1) {
        alert('Such login name exists, please write another login');
      } else if (this.username !== '' && this.password !== '') {
        this.accountList = [
          ...this.accountList,
          {
            username: this.username,
            password: this.password,
          }
        ];
        localStorage.setItem('accounts', JSON.stringify(this.accountList));
        localStorage.setItem('authorized', JSON.stringify('done'));
        this.router.navigateByUrl('/');
      }
    }
  }

}
