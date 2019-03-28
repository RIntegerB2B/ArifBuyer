import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import {AccountService} from './../account.service';
import {profileModel} from './profile.model';
import {mobileNumber} from './../../shared/validation';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
profileHolder: profileModel;
profileForm: FormGroup;
x = '5c9b8e9c6808a52468924019';
  constructor(private fb: FormBuilder, private accountService: AccountService) { }

  ngOnInit() {
    this.profileDetails();
  }
  profileDetails() {
    this.profileForm = this.fb.group({
      emailId: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
     mobileNumber: ['', mobileNumber],
      firstName: [''],
      lastName: [''],
      dateOfBirth: [''],
      location: [''],
      gender: ['']
    });
    }
    onSubmit() {
      this.profileHolder = new profileModel();
      this.profileHolder.emailId = this.profileForm.controls.emailId.value;
      this.profileHolder.mobileNumber = this.profileForm.controls.mobileNumber.value;
      this.profileHolder.password = this.profileForm.controls.password.value;
      this.profileHolder.firstName = this.profileForm.controls.firstName.value;
      this.profileHolder.lastName = this.profileForm.controls.lastName.value;
      this.profileHolder.dateOfBirth = this.profileForm.controls.dateOfBirth.value;
      this.profileHolder.location = this.profileForm.controls.location.value;
      this.profileHolder.gender = this.profileForm.controls.gender.value;
      this.accountService.getprofileDetails(this.profileHolder, this.x).subscribe(data => {
        this.profileHolder = data;
        console.log(this.profileHolder);
        this.profileHolder = data;
      }
        );
      /* console.log(this.regForm); */
      }
      getReset() {
      this.profileForm.reset();
      }
}
