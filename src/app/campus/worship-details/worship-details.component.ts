import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/AuthGuards/auth.service';
import { BackEndCalls } from '../../services/BackendHandling/backend-calls.service';
import { DataStorage } from '../../services/Providers/DataStorage';
import { Worship, Incharge } from '../../interfaces/ReportModel';
import swal from 'sweetalert2';

@Component({
  selector: 'worship-details',
  templateUrl: './worship-details.component.html',
  styleUrls: ['./worship-details.component.scss']
})
export class WorshipDetailsComponent implements OnInit {

  submitBtn = "Edit";
  isLoading = false;
  instrumentPlayers = {};

  constructor(
    public authService: AuthService,
    public service: BackEndCalls,
    public storage: DataStorage
  ) { }

  ngOnInit() {
    if(!this.storage.selectedReport.report.worship){
      this.storage.selectedReport.report.worship = {} as Worship;
      this.storage.selectedReport.report.worship.incharge = {} as Incharge;
      this.storage.selectedReport.report.worship.instrument = {};
    }
  }

  addChoirMember(member: string){
    if(!this.storage.selectedReport.report.worship.choir_members)
      this.storage.selectedReport.report.worship.choir_members = [];

    if(member != '')
      this.storage.selectedReport.report.worship.choir_members.push(member);
  }

  toggleLoading(){
    if(this.isLoading){
      this.isLoading = false;
      this.submitBtn = "Edit";
    }else{
      this.isLoading = true;
      this.submitBtn = "";
    }
  }

  submit(f){
    this.toggleLoading();
    let data = {
      leader: f.leader,
      choir_members: this.storage.selectedReport.report.worship.choir_members,
      incharge :{
        computer: f.computer,
        sound: f.sound
      },
      instrument: this.storage.selectedReport.report.worship.instrument
    }

    this.service.editWorshipDetails(this.authService.currentUser.id, this.storage.selectedReport.report.id, data)
    .subscribe(result => {
      swal('Success', 'Worship Details Edited Successfully', 'success');
      this.toggleLoading();
    },error => {
      swal('Error', 'There was an error editing the details, please try again later', 'error');
      this.toggleLoading();
    });
  }
}
