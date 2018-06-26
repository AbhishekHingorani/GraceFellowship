import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BackEndCalls } from '../../services/BackendHandling/backend-calls.service';
import { DataStorage } from '../../services/Providers/DataStorage';

@Component({
  selector: 'manage-campus',
  templateUrl: './manage-campus.component.html',
  styleUrls: ['./manage-campus.component.scss']
})
export class ManageCampusComponent implements OnInit {

  isLoading: boolean = true;
  isAddCampusLoading: boolean = false;
  campusList;
  doesPasswordMatch: boolean = true;
  submitBtn: string = "Add";

  constructor(
    private router: Router,
    private storage: DataStorage,
    private service: BackEndCalls
  ) { }

  ngOnInit() {
    if (this.storage.campusList == null) {
      this.getCampusList();
    }
    else {
      this.campusList = this.storage.campusList;
      this.isLoading = false;
    }
  }

  getCampusList() {
    this.service.getAllCampuses()
      .subscribe(data => {
        this.campusList = data;
        this.storage.campusList = this.campusList;
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

  changePassword(campus) {
    let pass, pass2;

    swal({
      title: "Enter New Password For " + campus.name + "!",
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
          
          this.service.changeCampusPassword(campus.id, data)
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

  submit(f) {
    this.toggleLoading();
    
    delete f.confirmPassword;
    f.username = 'c-' + f.username;

    this.service.insertCampus(f)
    .subscribe(result => {
      if(result >= 1){
        swal('Success!', 'Campus Inserted!', 'success'); 
        this.getCampusList();
        this.toggleLoading();
      }
    },
    error => {
      swal('Error!', 'There was some error, please try adding a new campus later!', 'error');
      this.toggleLoading();
    })
  }

  toggleLoading() {
    if (this.isAddCampusLoading) {
      this.isAddCampusLoading = false;
      this.submitBtn = "Add";
    } else {
      this.isAddCampusLoading = true;
      this.submitBtn = "";
    }
  }

}
