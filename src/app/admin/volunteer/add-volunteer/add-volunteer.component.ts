import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BackEndCalls } from '../../../services/BackendHandling/backend-calls.service';
import { VolunteerModel } from "../../../interfaces/VolunteerModel";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'add-volunteer',
  templateUrl: './add-volunteer.component.html',
  styleUrls: ['./add-volunteer.component.scss']
})
export class AddVolunteerComponent implements OnInit {

  doesPasswordMatch: boolean = false;
  volunteer: VolunteerModel;
  submitBtn: string = "Add";
  isEdit: boolean;
  id: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: BackEndCalls) { }

  ngOnInit() {
    this.volunteer = {
      id: '',
      name: '',
      username: '',
      password: '',
      email: '',
      contact: ''
    }

    //This function combines multiple Observables
    Observable.combineLatest([
      this.activatedRoute.paramMap,
      this.activatedRoute.queryParamMap
    ])
    .subscribe(params => {
      this.id = params[0].get("id"); //getting id from URL 
      this.isEdit = Boolean(params[1].get("edit")); //Saving 'Edit' query param if available
    });

    //If this is edit form, get all details of volunteer.
    if(this.isEdit){ 
      this.submitBtn = "Edit";
      this.service.getVolunteer(this.id)
        .subscribe(data => this.volunteer = data.json());
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