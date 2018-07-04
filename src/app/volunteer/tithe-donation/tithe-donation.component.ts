import { Component, OnInit } from '@angular/core';
import {DataStorage} from '../../services/Providers/DataStorage'
import swal from 'sweetalert2';

@Component({
  selector: 'tithe-donation',
  templateUrl: './tithe-donation.component.html',
  styleUrls: ['./tithe-donation.component.scss']
})
export class TitheDonationComponent implements OnInit {

  sum: number = 0;

  constructor(
    private storage: DataStorage,
  ) { }

  ngOnInit() {
    this.calculateSum();
  }

  addToTable(name, cat, amt){
    if(name=="" || cat=="" || amt=="") return;
  
    let temp = { name: name, category: cat, amount: amt };
    this.storage.donation.tithe.push(temp);
    this.sum += amt; 
  }

  calculateSum(){
    let sum = 0;
    this.storage.donation.tithe.forEach(i => {
      sum += i.amount;
    });
    this.sum = sum;
  }
}
