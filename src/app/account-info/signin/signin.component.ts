import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {SignIn} from './signIn.model';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  signInModel: SignIn;
  pwdError: boolean;
  submitted = false;
  constructor(private fb: FormBuilder, private router: Router, private accountService: AccountService ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.signInForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  setCookie(value) {
    const d: Date = new Date();
    d.setTime(d.getTime() + 700 * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    const cpath: string = 'cookie' ? `; path=${'cookie'}` : '';
    document.cookie = `${'USER_DETAILS'}=${value}; ${expires}${cpath}`;
}
  onSubmit() {
    this.submitted = true;
    this.signInModel = new SignIn();
    this.signInModel.userName = this.signInForm.controls.userName.value;
    this.signInModel.password = this.signInForm.controls.password.value;
    this.accountService.signIn(this.signInModel).subscribe(data => {
      if (data.length === 0) {
       this.pwdError = true;
       /* this.setCookie('false'); */
       localStorage.setItem('login', 'false');
      } else if (data.length !== 0) {
        this.router.navigate(['account/alert']);
        /* this.setCookie(data[0]._id); */
        localStorage.setItem('login', 'true');
      }
    });
  }
}
