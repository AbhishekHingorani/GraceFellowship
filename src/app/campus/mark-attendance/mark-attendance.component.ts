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

  private data: AttendanceData;
  members: MemberModel[];
  submitBtn = "Submit";
  isLoading = false;
  othersCount: number;
  
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
    }

    this.othersCount = (+this.storage.selectedReport.report.attendance.new - this.storage.selectedReport.report.attendees.new.length);
    this.members = this.storage.selectedReport.batch_members;      
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

    for (var i = 0; i < this.members.length; i++) {
      this.members[i].active = val;
      this.attendanceChanged(this.members[i]);
    }
  }

  submit(formData){
    this.toggleLoading();
    this.data.attendees.members = [];

    for (var i = 0; i < this.members.length; i++) {
      if(this.members[i].active)
        this.data.attendees.members.push(this.members[i].id);
    }

    this.data.attendance.male = this.storage.selectedReport.report.attendance.male;
    this.data.attendance.female = this.storage.selectedReport.report.attendance.female;
    this.data.attendance.new = this.data.attendees.new.length + this.othersCount;
    this.data.attendance.total = (this.storage.selectedReport.report.attendance.male + this.storage.selectedReport.report.attendance.female + this.data.attendance.new);

    console.log(this.data);

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

  attendanceChanged(member){
    if(member.active)
      member.gender == 'm' ? this.storage.selectedReport.report.attendance.male-- : this.storage.selectedReport.report.attendance.female--;
    else
      member.gender == 'm' ? this.storage.selectedReport.report.attendance.male++ : this.storage.selectedReport.report.attendance.female++;

    member.active = !member.active;
  }
}
