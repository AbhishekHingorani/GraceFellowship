import { Component, OnInit } from '@angular/core';
import { MemberModel } from "../../../interfaces/MemberModel";
import { BackEndCalls } from '../../../services/BackendHandling/backend-calls.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import swal from 'sweetalert2';
import { DataStorage } from '../../../services/Providers/DataStorage';

@Component({
  selector: 'add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  member: MemberModel;
  submitBtn: string = "Add";
  isEdit: boolean;
  isLoading: boolean = false;
  campusLoading: boolean = true;
  campusList;
  campusId: string;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private service: BackEndCalls,
    private storage: DataStorage,
  ) { }

  ngOnInit() {
    this.member = {
      id: '',
      name: '',
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

    //If isEdit is false then send request to add the member else to edit.
    if(this.isEdit == false){
      let campusId = formValues.campus;
      delete formValues.campus;
      
      this.service.addMember(campusId, formValues)
      .subscribe(response => {
        if(response >= 1)
          swal('Success', 'Member Added Successfully', 'success');
          this.toggleLoading();
          
          this.member = {
            id: '',
            name: '',
            email: '',
            contact: '',
            gender: '',
            address: '',
            active: false
          }
      });
    }
    else{
        this.service.editMember(this.campusId, this.member)
        .subscribe(response => {
          console.log(response == 1);
          if(response >= 1)
            swal('Success', 'Member Edited Successfully', 'success');
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
