import { Component, OnInit } from '@angular/core';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { MemberModel } from "../../interfaces/MemberModel";
import { BackEndCalls } from '../../services/BackendHandling/backend-calls.service';
import { AuthService } from '../../services/AuthGuards/auth.service';
import { DataStorage } from '../../services/Providers/DataStorage';
import { ReportModel } from "../../interfaces/ReportModel";

declare interface AttendanceData{
  presentMembers: string[];
  girlsCount: number;
  boysCount: number;
  newMembersCount: number;
}

@Component({
  selector: 'mark-attendance',
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.scss']
})
export class MarkAttendanceComponent implements OnInit {

  private data: AttendanceData;
  members: MemberModel[];

  constructor(
    private service: BackEndCalls,
    private authService: AuthService,
    private storage: DataStorage
  ) {}

  ngOnInit() {  
    this.data = {
      presentMembers: [],
      boysCount: 0,
      girlsCount: 0,
      newMembersCount: 0
    }

    this.members = this.storage.selectedReport.batch_members;
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
    }
  }

  submit(formData){
    let str = "";

    for (var i = 0; i < this.members.length; i++) {
      if(this.members[i].active){
        this.data.presentMembers.push(this.members[i].id);
        if(this.members[i].gender=="m")
          this.data.boysCount++;
        else
          this.data.girlsCount++;
      }
    }
    console.log(JSON.stringify(this.data));
  }
 
}
