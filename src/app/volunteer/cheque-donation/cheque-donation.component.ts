import { Component, OnInit } from '@angular/core';
import {DataStorage} from '../../services/Providers/DataStorage'
import swal from 'sweetalert2';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const date = new Date;

@Component({
  selector: 'cheque-donation',
  templateUrl: './cheque-donation.component.html',
  styleUrls: ['./cheque-donation.component.scss']
})
export class ChequeDonationComponent implements OnInit {

  sum: number = 0;
  model: NgbDateStruct;

  constructor(
    private storage: DataStorage,
  ) { }

  ngOnInit() {
    this.calculateSum();
    this.model = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
  }

  addToTable(name, cat, bank, chequeNo, amt){
    if(name=="" || cat=="" || amt=="" || bank=="" || chequeNo=="") return;
  
    let d = this.model.day + '-' + this.model.month + '-' + this.model.year;

    let temp = { name: name, category: cat, bank: bank, cheque_no: chequeNo, cheque_date:d, amount: amt };
    this.storage.donation.cheque.push(temp);
    this.sum += amt; 
  }

  calculateSum(){
    let sum = 0;
    this.storage.donation.cheque.forEach(i => {
      sum += i.amount;
    });
    this.sum = sum;
  }
}
