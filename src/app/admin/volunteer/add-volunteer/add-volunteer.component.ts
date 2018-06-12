import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BackEndCalls } from '../../../services/BackendHandling/backend-calls.service';
import { VolunteerModel } from "../../../interfaces/VolunteerModel";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import swal from 'sweetalert2';

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
  isLoading: boolean = false;
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
      console.log("edit : " + this.id);
      this.isEdit = Boolean(params[1].get("edit")); //Saving 'Edit' query param if available
    });

    //checking if routing is complete and this.activatedRoute.snapshot is up to date
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        //if routing is complete, then fetch volunteer's data
        if(this.isEdit){ 
          this.submitBtn = "Edit";
          this.service.getVolunteer(this.id)
            .subscribe((data: VolunteerModel) => this.volunteer = data);
        }
      }
    });  
  }

  validatePassword(pass, pass2){
    if(pass2==""){
      this.doesPasswordMatch = false;
      return;
    }

    (pass==pass2) ? this.doesPasswordMatch = false:this.doesPasswordMatch = true;
  }

  submit(formValues){
    this.toggleLoading();
    delete formValues.confirmPassword;
    let data = JSON.stringify(formValues);

    console.log(data);
    
    //If isEdit is false then send request to add the volunteer else to edit.
    if(this.isEdit == false){
      this.service.addVolunteer(data)
      .subscribe(response => {
        if(response >= 1)
          swal('Success', 'Volunteer Added Successfully', 'success');
          this.toggleLoading();
      });
    }
    else{
      this.service.editVolunteer(this.id, data)
      .subscribe(response => {
        console.log(response == 1);
        if(response >= 1)
          swal('Success', 'Volunteer Edited Successfully', 'success');
          this.toggleLoading();
      })
    }
    
  }

  toggleLoading(){
    if(this.isLoading){
      this.isLoading = false;
      this.submitBtn = this.isEdit ? "Edit" : "Add";
    }else{
      console.log("idhar aya");
      
      this.isLoading = true;
      this.submitBtn = "";
    }
  }
}