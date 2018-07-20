import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BackEndCalls } from '../../services/BackendHandling/backend-calls.service';
import { DataStorage } from '../../services/Providers/DataStorage';

@Component({
  selector: 'trustee',
  templateUrl: './trustee.component.html',
  styleUrls: ['./trustee.component.scss']
})
export class TrusteeComponent implements OnInit {

  focus0; focus1; focus2; focus3; focus4; focus5;
  isLoading: boolean = true;
  isAddTrusteeLoading: boolean = false;
  trusteeList = [];
  doesPasswordMatch: boolean = true;
  submitBtn: string = "Add";

  constructor(
    public storage: DataStorage,
    public service: BackEndCalls
  ) { }

  ngOnInit() {
    this.service.getAllTrustees()
    .subscribe((data: any[]) => {
      this.trusteeList = data;
      this.isLoading = false;
    })
  }

  validatePassword(pass, pass2) {
    if (pass2 == "") {
      this.doesPasswordMatch = true;
      return;
    }

    (pass == pass2) ? this.doesPasswordMatch = true : this.doesPasswordMatch = false;
  }

  submit(f) {
    this.toggleLoading();
    
    delete f.confirmPassword;

    this.service.addTrustee(f)
    .subscribe(result => {
      swal('Success!', 'New Trustee Inserted!', 'success'); 
      this.toggleLoading();
      f.id = result;
      this.trusteeList.push(f);
    },
    error => {
      swal('Error!', 'There was some error, please try adding a new turustee later!', 'error');
      this.toggleLoading();
    })
  }

  toggleLoading() {
    if (this.isAddTrusteeLoading) {
      this.isAddTrusteeLoading = false;
      this.submitBtn = "Add";
    } else {
      this.isAddTrusteeLoading = true;
      this.submitBtn = "";
    }
  }

  deleteTrustee(id){
    let index = this.trusteeList.map(function(x){ return x.id; }).indexOf(id);
    this.trusteeList.splice(index,1);
    
    let deletedInstrument = this.trusteeList[index];
    
    this.service.deleteTrustee(id)
    .subscribe(data => {
      if(data < 1 || data == null){
        swal('Error','There was an error deleting the Trustee','error');
        this.trusteeList.push(deletedInstrument);
      }
    })
  }

  changePassword(trustee) {
    let pass, pass2;

    swal({
      title: "Enter New Password For " + trustee.name + "!",
      html:
        '<input type="password" placeholder="Enter new password..." id="swal-input1" class="swal2-input">' +
        '<input type="password" placeholder="Confirm password..." id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        pass = (<HTMLInputElement>document.getElementById('swal-input1')).value;
        pass2 = (<HTMLInputElement>document.getElementById('swal-input2')).value;
      }
    }).then(
      result => {
        if(pass.length < 6)
          swal('Whoops!', 'Password should be atleast 6 characters!', 'error');
        else if (pass != pass2)
          swal('Whoops!', "Password don't match!", 'error');
        else {
          let data = {password: pass};
          
          this.service.changeTrusteePassword(trustee.id, data)
          .subscribe(result => {
            if(result >= 1)
              swal('Success!', 'Password Changed!', 'success'); 
          },
          error => {
            swal('Error!', 'There was some error, please try changing the password later!', 'error');
          })
        }
      }
    );
  }
}
