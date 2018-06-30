import { Component, OnInit } from '@angular/core';
import { Ending, Activities } from '../../interfaces/ReportModel';
import { AuthService } from '../../services/AuthGuards/auth.service';
import { BackEndCalls } from '../../services/BackendHandling/backend-calls.service';
import { DataStorage } from '../../services/Providers/DataStorage';
import swal from 'sweetalert2';

@Component({
  selector: 'ending-details',
  templateUrl: './ending-details.component.html',
  styleUrls: ['./ending-details.component.scss']
})
export class EndingDetailsComponent implements OnInit {

  submitBtn = "Edit";
  isLoading = false;

  constructor(
    private authService: AuthService,
    private service: BackEndCalls,
    private storage: DataStorage
  ) { }

  ngOnInit() {
    if(!this.storage.selectedReport.report.ending){
      this.storage.selectedReport.report.ending = {} as Ending;
      this.storage.selectedReport.report.ending.prayer = "";
      this.storage.selectedReport.report.ending.time = "00:00:00";
    }
    if(!this.storage.selectedReport.report.activities){
      this.storage.selectedReport.report.activities = {} as Activities;
      this.storage.selectedReport.report.activities.announcement = "";
      this.storage.selectedReport.report.activities.lords_table = false;
    }
  }

  submit(f){
    this.toggleLoading();

    let data = {
      activities:{
        lords_table:  f.lordsTable,
        announcement: f.announcement
      },
      ending:{
        time: f.endTime,
        prayer: f.prayer
      }
    }

    console.log(data);

    this.service.editEndingDetails(this.authService.currentUser.id, this.storage.selectedReport.report.id, data)
    .subscribe(result => {
      swal('Success', 'Ending Details Edited Successfully', 'success');
      this.toggleLoading();
    },error => {
      swal('Error', 'There was an error editing the details, please try again later', 'error');
      this.toggleLoading();
    });
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
}
