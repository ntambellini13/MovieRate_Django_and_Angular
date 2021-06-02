import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service'
import { CookieService } from 'ngx-cookie-service';

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

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
  }

  saveForm() {
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result: TokenObject) => {
        console.log(result);
        this.cookieService.set('token', result.token);
      },
      error => console.log(error)
    );
  }

}
