import { Component, OnInit } from '@angular/core';
import { MemberModel } from "../../../interfaces/MemberModel";
import { BackEndCalls } from '../../../services/BackendHandling/backend-calls.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import swal from 'sweetalert2';

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
  id: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: BackEndCalls) { }

  ngOnInit() {
    this.member = {
      id: '',
      name: '',
      email: '',
      contact: '',
      gender: '',
      address: ''
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
          this.service.getMember(this.id)
            .subscribe((data: MemberModel) => this.member = data);
        }
      }
    });  
  }

  submit(formValues){
    this.toggleLoading();
    let data = JSON.stringify(formValues);

    console.log(data);
    
    //If isEdit is false then send request to add the member else to edit.
    // if(this.isEdit == false){
    //   this.service.addVolunteer(data)
    //   .subscribe(response => {
    //     if(response >= 1)
    //       swal('Success', 'Volunteer Added Successfully', 'success');
    //       this.toggleLoading();
    //   });
    // }
    // else{
    //   this.service.editVolunteer(this.id, data)
    //   .subscribe(response => {
    //     console.log(response == 1);
    //     if(response >= 1)
    //       swal('Success', 'Volunteer Edited Successfully', 'success');
    //       this.toggleLoading();
    //   })
    // }
    
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
