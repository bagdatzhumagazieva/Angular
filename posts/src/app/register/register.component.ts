import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../services/authontication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  countries = [
    'Kz',
    'Rs',
    'En'
  ];

  name = new FormControl('', [
    Validators.required,
  ]);

  username = new FormControl('', [
    Validators.required,
  ]);

  phone = new FormControl('', [
    Validators.required,
  ]);

  country = new FormControl('', [
    Validators.required,
  ]);

  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  password = new FormControl('', [
    Validators.required,
  ]);

  confirmPass = new FormControl('', [
    Validators.required,
  ]);
  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  getValidation = () => {
    return !this.confirmPass.valid ||
      !this.password.valid ||
      !this.phone.valid ||
      !this.country.valid ||
      !this.name.valid ||
      !this.email.valid;
  }

  signUp = () => {
    this.authenticationService.register({
      name: this.name.value,
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
      phone: this.phone.value,
    });
  }

}
