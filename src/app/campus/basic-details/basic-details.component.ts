import { Component, OnInit } from '@angular/core';
import { DataStorage } from '../../services/Providers/DataStorage';
import { BackEndCalls } from '../../services/BackendHandling/backend-calls.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { AuthService } from '../../services/AuthGuards/auth.service';

@Component({
  selector: 'basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.scss']
})
export class BasicDetailsComponent implements OnInit {

  focus; focus1;
  submitBtn = "Edit";
  isLoading = false;
  
  constructor(
    public authService: AuthService,
    public service: BackEndCalls,
    public storage: DataStorage
  ) { }

  ngOnInit() {}

  submit(f){
    this.toggleLoading();
    f.begining = {
      start: f.beginTime,
      prayer: f.prayer
    }
    f.date = f.date.day + '-' + f.date.month + '-' + f.date.year;
    this.storage.selectedReport.report.date = f.date;
    delete f.beginTime;
    delete f.prayer;
    
    let index = this.storage.allReports.findIndex(x => x.id==this.storage.selectedReport.report.id);
    this.storage.allReports.splice(index, 1, f);
    
    this.service.editBasicReportDetails(this.authService.currentUser.id, this.storage.selectedReport.report.id, f)
    .subscribe(result => {
      if(result >= 1 ){
        swal('Success', 'Basic Details Edited Successfully', 'success');
        this.toggleLoading();
      }
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
