import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BackEndCalls } from '../../../services/BackendHandling/backend-calls.service';
import { VolunteerModel } from "../../../interfaces/VolunteerModel";
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import swal from 'sweetalert2';
import { DataStorage } from '../../../services/Providers/DataStorage';

@Component({
  selector: 'add-volunteer',
  templateUrl: './add-volunteer.component.html',
  styleUrls: ['./add-volunteer.component.scss']
})
export class AddVolunteerComponent implements OnInit {

  focus; focus0; focus2; focus3; focus4; focus5;
  doesPasswordMatch: boolean = false;
  volunteer: VolunteerModel;
  submitBtn: string = "Add";
  isEdit: boolean;
  isLoading: boolean = false;
  campusLoading: boolean = true;
  campusList;
  campusId: string;

  constructor(
    public router: Router, 
    public activatedRoute: ActivatedRoute, 
    public service: BackEndCalls,
    public storage: DataStorage,
  ) { }

  ngOnInit() {
    this.volunteer = {
      id: '',
      name: '',
      username: '',
      password: '',
      email: '',
      contact: ''
    }

    this.activatedRoute.queryParamMap
    .subscribe(params => {
      this.isEdit = Boolean(params.get("edit")); //Saving 'Edit' query param if available
      this.campusId = params.get("campusId");  
    });

    if(this.storage.campusList == null){
      this.getCampusList();
    }
    else{
      this.campusList = this.storage.campusList;
      this.campusLoading = false;   
    }

    if(this.isEdit && this.storage.volunteer != null){
      this.submitBtn = "Edit";
      this.volunteer = this.storage.volunteer;
    }
  }

  getCampusList(){
    //getting list of campuses
    this.service.getAllCampuses()
    .subscribe(data => {
      this.campusList = data;
      this.storage.campusList = this.campusList;
      this.campusLoading = false;
    })
  }

  validatePassword(pass, pass2){
    if(pass2==""){
      this.doesPasswordMatch = false;
      return;
    }

    (pass==pass2) ? this.doesPasswordMatch = false:this.doesPasswordMatch = true;
  }

  submit(data){
    if(this.isLoading) return;  //once user has submited, he cannot click btn again while loading

    this.toggleLoading();
    delete data.confirmPassword;
    
    //If isEdit is false then send request to add the volunteer else to edit.
    if(this.isEdit == false){
      this.service.addVolunteer(this.campusId, data)
      .subscribe(response => {
        if(response >= 1)
          swal('Success', 'Volunteer Added Successfully', 'success');
          this.toggleLoading();
      });
    }
    else{
      this.service.editVolunteer(this.campusId, this.volunteer.id, data)
      .subscribe(response => {
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
      this.isLoading = true;
      this.submitBtn = "";
    }
  }
}