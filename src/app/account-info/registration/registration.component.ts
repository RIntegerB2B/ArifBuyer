import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,FormArray, FormBuilder, Validators} from '@angular/forms';
import {AccountService} from './../account.service';
import {regModel} from './registration.model';
import {mobileNumber} from './../../shared/validation';
import { from } from 'rxjs';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  hide = true;
  holder:regModel;
  regForm: FormGroup;
  emailId = new FormControl('', [Validators.required, Validators.email]);

 
  
constructor(private fb: FormBuilder,private accountService: AccountService) { }

ngOnInit() {
this.regForm = this.fb.group({
  emailId:['',Validators.email],
 password: ['', [Validators.required, Validators.minLength(6)]],
mobileNumber:['',mobileNumber]

});
}
onSubmit() {
this.holder = new regModel();
this.holder.emailId = this.regForm.controls.emailId.value;
this.holder.mobileNumber = this.regForm.controls.mobileNumber.value;
this.holder.password = this.regForm.controls.password.value;
this.accountService.getregForm(this.holder).subscribe(data =>{this.holder=data
  console.log(this.holder);
this.holder= data;
}
  )
/* console.log(this.regForm); */


}
getReset() {
this.regForm.reset();
}


}