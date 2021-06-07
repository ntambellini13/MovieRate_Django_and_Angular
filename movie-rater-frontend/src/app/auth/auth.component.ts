import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

interface TokenObject {
  token: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  registerMode = false;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router : Router,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    const token = this.cookieService.get('token');
    if (token) {
      this.router.navigate(['/movies']);
    }
  }

  saveForm() {
    if (!this.registerMode) {
      this.loginUser();
    } else {
      this.apiService.registerUser(this.authForm.value).subscribe(
        result => {
          this.loginUser();
        },
        error => this.alertify.error('Registration failed, please try again.')
      );
    }
  }
  
  loginUser() {
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result: TokenObject) => {
        this.cookieService.set('token', result.token);
        this.router.navigate(['/movies']);
        this.alertify.success('Successfully logged in!');
      },
      error => this.alertify.error('Login failed, please try again using your username and password if you have an account.')
    );
  }
  
}
