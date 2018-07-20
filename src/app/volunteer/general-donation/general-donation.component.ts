import { Component, OnInit } from '@angular/core';
import {DataStorage} from '../../services/Providers/DataStorage'
import swal from 'sweetalert2';
import { AuthService } from '../../services/AuthGuards/auth.service';
import { BackEndCalls } from '../../services/BackendHandling/backend-calls.service';
import { General } from '../../interfaces/DonationModel';

@Component({
  selector: 'general-donation',
  templateUrl: './general-donation.component.html',
  styleUrls: ['./general-donation.component.scss']
})
export class GeneralDonationComponent implements OnInit {

  submitBtn: string = "Edit";
  isLoading: boolean = false;

  constructor(
    public storage: DataStorage,
    public service: BackEndCalls,
    public authService: AuthService,
  ) { }

  ngOnInit() {
    // if(this.storage.donation && this.storage.donation.general)
    //   this.storage.donation.general.sort(function(a, b){return +a.denom - +b.denom});
  }

  addToTable(d, q){
    if(d=="" || q=="") return;

    if(this.storage.donation.general){
      let i = this.storage.donation.general.map(item => item.denom).indexOf(d);
      if(i == -1){
        let temp = { denom: d, quantity: q }
        this.storage.donation.general.push(temp);
      }else{
        this.storage.donation.general[i].quantity += q;
      }

      this.storage.donation.general.sort(function(a, b){return +a.denom - +b.denom});
    }
    else{
      this.storage.donation.general = [] as General[];
      this.storage.donation.general.push({ denom: d, quantity: q });
    }
  }

  calculateSum() : number{
    let sum = 0;
    if(this.storage.donation && this.storage.donation.general){
      this.storage.donation.general.forEach(i => {
        sum += (+i.denom * i.quantity);
      });
    }
    return sum;
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

  submit(){
    this.toggleLoading();
    this.service.submitGeneralDonation(this.authService.currentUser.id, this.storage.donation.report.id, this.storage.donation.general)
    .subscribe(result => {
      if(result >= 1) swal("Success", "General data added", "success");
      this.toggleLoading();
    },error => {
      swal("Error", "There was some error updating General Donation data", "error");
      this.toggleLoading();
    })
  }
}
