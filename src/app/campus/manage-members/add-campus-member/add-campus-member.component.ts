import { Component, OnInit } from '@angular/core';
import { MemberModel } from '../../../interfaces/MemberModel';
import { ActivatedRoute } from '@angular/router';
import { BackEndCalls } from '../../../services/BackendHandling/backend-calls.service';
import { DataStorage } from '../../../services/Providers/DataStorage';
import swal from 'sweetalert2';
import { AuthService } from '../../../services/AuthGuards/auth.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const date = new Date;

@Component({
  selector: 'add-campus-member',
  templateUrl: './add-campus-member.component.html',
  styleUrls: ['./add-campus-member.component.scss']
})
export class AddCampusMemberComponent implements OnInit {

  model: NgbDateStruct;
  member: MemberModel;
  submitBtn: string = "Add";
  isEdit: boolean;
  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private service: BackEndCalls,
    private storage: DataStorage,
    private authService: AuthService
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
    });

    if(this.isEdit && this.storage.member != null){
      this.submitBtn = "Edit";
      this.member = this.storage.member;
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

  submit(formValues){
    console.log(formValues);
    this.toggleLoading();
    let campusId = this.authService.currentUser.id;
    formValues.join_date = this.model.day + '-' + this.model.month + '-' + this.model.year;
    this.member.join_date = formValues.join_date;

    //If isEdit is false then send request to add the member else to edit.
    if(this.isEdit == false){
     
      this.service.addMember_Campus(campusId, formValues)
      .subscribe(response => {
        if(response >= 1)
          swal('Success', 'Member Added Successfully', 'success');
          this.toggleLoading();
          
          this.storage.membersList.push(this.member);
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
        this.service.editMember_Campus(campusId, this.member)
        .subscribe(response => {
          console.log(response == 1);
          if(response >= 1)
            swal('Success', 'Member Edited Successfully', 'success');
            this.toggleLoading();
          },error => {
            swal('Error', 'There was an error, cannot edit member', 'error');
            this.toggleLoading();
          });
    }
    
  }

}
