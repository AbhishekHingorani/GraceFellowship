import { Component, OnInit } from '@angular/core';
import { Sermon } from '../../interfaces/ReportModel';
import { AuthService } from '../../services/AuthGuards/auth.service';
import { BackEndCalls } from '../../services/BackendHandling/backend-calls.service';
import { DataStorage } from '../../services/Providers/DataStorage';
import swal from 'sweetalert2';

@Component({
  selector: 'sermon-detail',
  templateUrl: './sermon-detail.component.html',
  styleUrls: ['./sermon-detail.component.scss']
})
export class SermonDetailComponent implements OnInit {

  submitBtn = "Edit";
  isLoading = false;

  constructor(
    public authService: AuthService,
    public service: BackEndCalls,
    public storage: DataStorage
  ) { }

  ngOnInit() {
    if(!this.storage.selectedReport.report.sermon){
      this.storage.selectedReport.report.sermon = {} as Sermon;
      this.storage.selectedReport.report.sermon.start = "00:00:00";
      this.storage.selectedReport.report.sermon.end = "00:00:00";
      this.storage.selectedReport.report.sermon.preacher = "";
      this.storage.selectedReport.report.sermon.title = "";
    }
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

    this.service.editSermonDetails(this.authService.currentUser.id, this.storage.selectedReport.report.id, f)
    .subscribe(result => {
      swal('Success', 'Sermon Details Edited Successfully', 'success');
      this.toggleLoading();
    },error => {
      swal('Error', 'There was an error editing the details, please try again later', 'error');
      this.toggleLoading();
    });
  }

}
