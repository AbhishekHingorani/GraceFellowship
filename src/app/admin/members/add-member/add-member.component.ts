import { Component, OnInit } from '@angular/core';
import { MemberModel } from "../../../interfaces/MemberModel";
import { BackEndCalls } from '../../../services/BackendHandling/backend-calls.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/observable/combineLatest';
import swal from 'sweetalert2';
import { DataStorage } from '../../../services/Providers/DataStorage';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const date = new Date;

@Component({
  selector: 'add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  focus0; focus1; focus2; focus3; focus4;
  member: MemberModel;
  submitBtn: string = "Add";
  isEdit: boolean;
  isLoading: boolean = false;
  campusLoading: boolean = true;
  campusList;
  campusId: string;
  model: NgbDateStruct;

  constructor(
    public activatedRoute: ActivatedRoute, 
    public service: BackEndCalls,
    public storage: DataStorage,
  ) { }

  ngOnInit() {
    this.model = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
    
    this.member = {
      id: '',
      name: '',
      join_date: '',
      email: '',
      contact: '',
      gender: '',
      address: '',
      active: false,
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

    if(this.isEdit && this.storage.member != null){
      this.submitBtn = "Edit";
      this.member = this.storage.member;
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

  submit(formValues){
    this.toggleLoading();
    formValues.join_date = this.model.day + '-' + this.model.month + '-' + this.model.year;
    
    //If isEdit is false then send request to add the member else to edit.
    if(this.isEdit == false){
      delete formValues.campus;
      
      this.service.addMember(this.campusId, formValues)
      .subscribe(response => {
        if(response >= 1)
          swal('Success', 'Member Added Successfully', 'success');
          this.toggleLoading();
          
          this.member = {
            id: '',
            name: '',
            join_date: '',
            email: '',
            contact: '',
            gender: '',
            address: '',
            active: false
          }
      },error => {
        swal('Error', 'There was an error, cannot add member', 'error'); 
        this.toggleLoading();
      });
    }
    else{
        this.service.editMember(this.campusId, this.member)
        .subscribe(response => {
          if(response >= 1){
            swal('Success', 'Member Edited Successfully', 'success');
            this.toggleLoading();
          }
        },error => {
          swal('Error', 'There was an error, cannot add member', 'error'); 
          this.toggleLoading();
        });
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
