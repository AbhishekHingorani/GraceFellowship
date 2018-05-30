import { Component, OnInit } from '@angular/core';

declare interface DATA{
  presentMembers: number[];
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

  private data: DATA;
  
  members = [
    {
      id: 1,
      name: "Ashvin Prajapati",
      gender: "m",
      isPresent: false
    },
    {
      id: 2,
      name: "Jayesh Vaghela",
      gender: "m",
      isPresent: false
    },
    {
      id: 3,
      name: "Shushmita Sharma",
      gender: "f",
      isPresent: true
    },
    {
      id: 4,
      name: "Rajmata Shivgamini",
      gender: "f",
      isPresent: false
    },
    {
      id: 5,
      name: "Rajmata Shivgamini",
      gender: "f",
      isPresent: false
    }
  ];

  constructor() {
  }

  ngOnInit() {  
    this.data = {
      presentMembers: [],
      boysCount: 0,
      girlsCount: 0,
      newMembersCount: 0
    }
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
      this.members[i].isPresent = val;
    }
  }

  submit(formData){
    let str = "";

    for (var i = 0; i < this.members.length; i++) {
      if(this.members[i].isPresent){
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
