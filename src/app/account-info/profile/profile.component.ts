import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from './../account.service';
import { ProfileModel } from './profile.model';
import { mobileNumber } from './../../shared/validation';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileHolder: ProfileModel;
  profileForm: FormGroup;
  userId: string;
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
    this.profileHolder = new ProfileModel();
    this.userId = sessionStorage.getItem('userId');
    this.profileHolder.firstName = this.profileForm.controls.firstName.value;
    this.profileHolder.lastName = this.profileForm.controls.lastName.value;
    this.profileHolder.dateOfBirth = this.profileForm.controls.dateOfBirth.value;
    this.profileHolder.location = this.profileForm.controls.location.value;
    this.profileHolder.gender = this.profileForm.controls.gender.value;
    this.accountService.getprofileDetails(this.profileHolder, this.userId).subscribe(data => {
      this.profileHolder = data;
      console.log(this.profileHolder);
      this.profileHolder = data;
    }, error => {
        console.log(error);
    }
    );
    /* console.log(this.regForm); */
  }
  getReset() {
    this.profileForm.reset();
  }
}
