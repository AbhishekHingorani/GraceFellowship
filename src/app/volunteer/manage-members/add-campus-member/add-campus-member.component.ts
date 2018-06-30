import { Component, OnInit } from '@angular/core';
import { MemberModel } from '../../../interfaces/MemberModel';
import { ActivatedRoute } from '@angular/router';
import { BackEndCalls } from '../../../services/BackendHandling/backend-calls.service';
import { DataStorage } from '../../../services/Providers/DataStorage';
import swal from 'sweetalert2';
import { AuthService } from '../../../services/AuthGuards/auth.service';

@Component({
  selector: 'add-campus-member',
  templateUrl: './add-campus-member.component.html',
  styleUrls: ['./add-campus-member.component.scss']
})
export class AddCampusMemberComponent implements OnInit {

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
    this.toggleLoading();
    let campusId = this.authService.currentUser.id;

    //If isEdit is false then send request to add the member else to edit.
    if(this.isEdit == false){
     
      this.service.addMember(campusId, formValues)
      .subscribe(response => {
        if(response >= 1)
          swal('Success', 'Member Added Successfully', 'success');
          this.toggleLoading();
          
          this.storage.membersList.push(this.member);
          this.member = {
            id: '',
            name: '',
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
        this.service.editMember(campusId, this.member)
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
