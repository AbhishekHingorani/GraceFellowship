import { Component, OnInit } from '@angular/core';
import {DataStorage} from '../../services/Providers/DataStorage'
import swal from 'sweetalert2';

@Component({
  selector: 'general-donation',
  templateUrl: './general-donation.component.html',
  styleUrls: ['./general-donation.component.scss']
})
export class GeneralDonationComponent implements OnInit {

  sum: number = 0;

  constructor(
    private storage: DataStorage,
  ) { }

  ngOnInit() {
    let data =  {
      general: [
        { denom:"10", quantity:5 },
        { denom:"100", quantity:10 }
      ],
      cheque: [
        { name:"qwe", category:"Books", bank:"asd", cheque_no:"123",
          cheque_date:"12-2-18", amount:123
        },
        { name:"qwe", category:"Books", bank:"asd", cheque_no:"123",
          cheque_date:"12-2-18", amount:123
        }
      ],
      tithe: [
        { name:"poi", category:"Books", amount:5000 },
        { name:"lkj", category:"Renovation", amount:1000 }
      ],
      donation_categories: ["Books", "Renovation"]
    }
    this.storage.donation = data;
    this.calculateSum();
    this.storage.donation.general.sort(function(a, b){return a.denom - b.denom});
  }

  addToTable(d, q){
    if(d=="" || q=="") return;
    let i = this.storage.donation.general.map(item => item.denom).indexOf(d);
    if(i == -1){
      let temp = { denom: d, quantity: q }
      this.storage.donation.general.push(temp);
      this.sum += (temp.denom * temp.quantity); 
    }else{
      this.storage.donation.general[i].quantity += q;
      this.calculateSum();
    }

    this.storage.donation.general.sort(function(a, b){return a.denom - b.denom});
  }

  calculateSum(){
    let sum = 0;
    this.storage.donation.general.forEach(i => {
      sum += (i.denom * i.quantity);
    });
    this.sum = sum;
  }
}
