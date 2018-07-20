import { Component, OnInit } from '@angular/core';
import {DataStorage} from '../../services/Providers/DataStorage'
import swal from 'sweetalert2';
import { Tithe } from '../../interfaces/DonationModel';
import { BackEndCalls } from '../../services/BackendHandling/backend-calls.service';
import { AuthService } from '../../services/AuthGuards/auth.service';

@Component({
  selector: 'tithe-donation',
  templateUrl: './tithe-donation.component.html',
  styleUrls: ['./tithe-donation.component.scss']
})
export class TitheDonationComponent implements OnInit {

  submitBtn: string = "Edit";
  isLoading: boolean = false;

  constructor(
    public storage: DataStorage,
    public service: BackEndCalls,
    public authService: AuthService,
  ) { }

  ngOnInit() {
      // if(this.storage.donation && this.storage.donation.tithe)
      //   this.storage.donation.tithe = {} as Tithe[];
  }

  addToTable(name, cat, amt){
    if(name=="" || cat=="" || amt=="") return;
  
    if(this.storage.donation.tithe){
      let temp = { name: name, category: cat, amount: amt };
      this.storage.donation.tithe.push(temp);
    }else{
      this.storage.donation.tithe = [];
      let temp = { name: name, category: cat, amount: amt };
      this.storage.donation.tithe.push(temp);
    }
  }

  calculateSum(): number{
    let sum = 0;
    if(this.storage.donation && this.storage.donation.tithe){
      this.storage.donation.tithe.forEach(i => {
        sum += i.amount;
      });
    }
    return sum;
  }

  submit(){
    this.toggleLoading();
    this.service.submitTitheDonation(this.authService.currentUser.id, this.storage.donation.report.id, this.storage.donation.tithe)
    .subscribe(result => {
      if(result >= 1) swal("Success", "Tithe data added", "success");
      this.toggleLoading();
    },error => {
      swal("Error", "There was some error updating Tithe Donation data", "error");
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
