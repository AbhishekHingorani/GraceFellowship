import { Component, OnInit } from '@angular/core';
import { MemberModel } from "../../interfaces/MemberModel";
import { BackEndCalls } from '../../services/BackendHandling/backend-calls.service';
import { AuthService } from '../../services/AuthGuards/auth.service';
import { DataStorage } from '../../services/Providers/DataStorage';
import swal from 'sweetalert2';

declare interface AttendanceData{
  attendance:{
    male: number,
    female: number,
    total: number,
    new: number,
  },
  attendees:{
    members: string[],
    new: string[]
  }
}

@Component({
  selector: 'mark-attendance',
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.scss']
})
export class MarkAttendanceComponent implements OnInit {

  data: AttendanceData;
  members: MemberModel[];
  submitBtn = "Submit";
  isLoading = false;
  male=0; female=0;
  
  constructor(
    private service: BackEndCalls,
    private authService: AuthService,
    private storage: DataStorage
  ) {}

  ngOnInit() {  
    this.data = {
      attendance: {
        male:0,
        female:0,
        total:0,
        new: 0
      },
      attendees: {
        members: [],
        new: []
      }
    }

    if(this.storage.selectedReport.report.attendees){
      //Marking all the members not in the attendees list as absent
      this.storage.selectedReport.batch_members.map((member) => {
        if(!this.isMemberPresent(member.id))
          member.active = false;
      });

      //assigning new attendees array
      this.data.attendees.new = this.storage.selectedReport.report.attendees.new;


      this.storage.othersCount = (+this.storage.selectedReport.report.attendance.new - this.storage.selectedReport.report.attendees.new.length);
    }else {
      if(!this.storage.newMembers)
        this.storage.newMembers = [];
  
      this.data.attendees.new = this.storage.newMembers;
    }
    
    this.members = this.storage.selectedReport.batch_members;   
    
    this.countAttendance();
  }

  //Checking if member with 'id' is present in array of present members
  isMemberPresent(id){
    if(this.storage.selectedReport.report.attendees.members.indexOf(id) > -1)
      return true;
    else
      return false;
  }

  allPresent(btnn){
    let val: boolean = false;

    if(btnn.value == "All Present"){
      val = true;
      btnn.value = "All Absent";
    }
    else{
      val = false;
      btnn.value = "All Present";
    }

    this.male = this.female = 0;

    for (var i = 0; i < this.members.length; i++) {
      this.members[i].active = val;

      if(this.members[i].active){
        if(this.members[i].gender=="m")
          this.male++;
        else
          this.female++;
      }
    }
  }

  submit(formData){
    this.toggleLoading();
    this.data.attendance.male = this.data.attendance.female = 0;
    this.data.attendees.members = [];

    for (var i = 0; i < this.members.length; i++) {
      if(this.members[i].active){
        this.data.attendees.members.push(this.members[i].id);
        if(this.members[i].gender=="m")
          this.data.attendance.male++;
        else
          this.data.attendance.female++;
      }
    }

    this.data.attendance.total = this.data.attendance.male + this.data.attendance.female;
    this.data.attendance.new = this.data.attendees.new.length + this.storage.othersCount;

    this.service.markAttendance(this.authService.currentUser.id, this.storage.selectedReport.report.id, this.data)
    .subscribe(response => {
      if(response >= 1){
        swal('Success', 'Attendance Saved to database', 'success');
        this.toggleLoading();
      }
    },
    error => {
      swal('Error', 'There was some error, attendace was not stored in the database', 'error');
      this.toggleLoading();
    })
  }

  addNewMember(member: string){
    if(member != '')
      this.data.attendees.new.push(member);
  }
 
  toggleLoading(){
    if(this.isLoading){
      this.isLoading = false;
      this.submitBtn = "Submit";
    }else{
      this.isLoading = true;
      this.submitBtn = "";
    }
  }

  countAttendance(){
    this.male = this.female = 0;

    for (var i = 0; i < this.members.length; i++) {
      if(this.members[i].active){
        if(this.members[i].gender=="m")
          this.male++;
        else
          this.female++;
      }
    }
  }
}
