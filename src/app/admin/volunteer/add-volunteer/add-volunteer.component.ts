import { Component, OnInit } from '@angular/core';

declare interface VolunteerData{
  name: string;
  username: string;
  password: string;
  email: string;
  contact: string;
}

@Component({
  selector: 'add-volunteer',
  templateUrl: './add-volunteer.component.html',
  styleUrls: ['./add-volunteer.component.scss']
})
export class AddVolunteerComponent implements OnInit {

  doesPasswordMatch: boolean = false;
  volunteer: VolunteerData;

  constructor() { }

  ngOnInit() {
    this.volunteer = {
      name: '',
      username: '',
      password: '',
      email: '',
      contact: ''
    }
  }

  validatePassword(pass, pass2){
    if(pass2==""){
      this.doesPasswordMatch = false;
      return;
    }

    (pass==pass2) ? this.doesPasswordMatch = false:this.doesPasswordMatch = true;
  }

  submit(formValues){
    delete formValues.confirmPassword;
    console.log(formValues);
  }
}