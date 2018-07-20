import { Component, OnInit } from '@angular/core';
import {DataStorage} from '../../services/Providers/DataStorage'
import swal from 'sweetalert2';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BackEndCalls } from '../../services/BackendHandling/backend-calls.service';
import { AuthService } from '../../services/AuthGuards/auth.service';

const date = new Date;

@Component({
  selector: 'cheque-donation',
  templateUrl: './cheque-donation.component.html',
  styleUrls: ['./cheque-donation.component.scss']
})
export class ChequeDonationComponent implements OnInit {

  focus10;
  model: NgbDateStruct;
  submitBtn: string = "Edit";
  isLoading: boolean = false;

  constructor(
    public storage: DataStorage,
    public service: BackEndCalls,
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.model = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
  }

  addToTable(name, cat, bank, chequeNo, amt){
    if(name=="" || cat=="" || amt=="" || bank=="" || chequeNo=="") return;
  
    let d = this.model.day + '-' + this.model.month + '-' + this.model.year;
    let temp = { name: name, category: cat, bank: bank, cheque_no: chequeNo, cheque_date:d, amount: amt };

    if(!this.storage.donation.cheque) this.storage.donation.cheque = [];

    this.storage.donation.cheque.push(temp);
  }

  calculateSum(){
    let sum = 0;
    if(this.storage.donation && this.storage.donation.cheque){
      this.storage.donation.cheque.forEach(i => {
        sum += i.amount;
      });
    }
    return sum;
  }

  submit(){
    this.toggleLoading();
    this.service.submitChequeDonation(this.authService.currentUser.id, this.storage.donation.report.id, this.storage.donation.cheque)
    .subscribe(result => {
      if(result >= 1) swal("Success", "Cheque data added", "success");
      this.toggleLoading();
    },error => {
      swal("Error", "There was some error updating Cheque Donation data", "error");
      this.toggleLoading();
    })
  }

  toggleLoading(){
    if(this.isLoading){
      this.isLoading = false;
      this.submitBtn = "Edit";
    }else{
      this.isLoading = true;
      this.submitBtn = "";
    }
  }
}
