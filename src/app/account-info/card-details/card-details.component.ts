import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from './../account.service';
import { cardDeatailModel } from './cardDetails.model';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  cardHolder: cardDeatailModel;
  cardDetailsForm: FormGroup;
  x = "5c9b8e9c6808a52468924019";
  constructor(private fb: FormBuilder, private accountService: AccountService) { }
  expiryMonth = ['01', "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  expiryYear = ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23",
    "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "38", "39", "40"];
  ngOnInit() {
    this.cardDetails();
  }

  cardDetails() {
    this.cardDetailsForm = this.fb.group({
      cardName: [''],
      cardNumber: [''],
      expiryMonth: [''],
      expiryYear: ['']

    });

  }

  onSubmit() {
    this.cardHolder = new cardDeatailModel();
    this.cardHolder.cardName = this.cardDetailsForm.controls.cardName.value;
    this.cardHolder.cardNumber = this.cardDetailsForm.controls.cardNumber.value;
    this.cardHolder.expiryMonth = this.cardDetailsForm.controls.expiryMonth.value;
    this.cardHolder.expiryYear = this.cardDetailsForm.controls.expiryYear.value;
    this.accountService.getcardDetails(this.cardHolder, this.x).subscribe(data => {
    this.cardHolder = data;
    console.log(this.cardHolder);
    this.cardHolder = data;
    }
    );
    /* console.log(this.regForm); */


  }
  getReset() {
    this.cardDetailsForm.reset();
  }





  /* var year = new Date().getFullYear();
var range = [];

range.push(year);

for (var i = 1; i < 7; i++) {
    range.push(year + i);
}

$scope.years = range; */


}



