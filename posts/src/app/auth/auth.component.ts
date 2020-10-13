import { Component, OnInit } from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authontication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService) {
  }

  username = new FormControl('', [
    Validators.required,
  ]);
  password = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers = () => {
    fetch('http://localhost:3000/users', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
  }

}
