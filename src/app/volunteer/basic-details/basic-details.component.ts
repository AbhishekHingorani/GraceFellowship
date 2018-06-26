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

  constructor(
    private authService: AuthService,
    private service: BackEndCalls,
    private storage: DataStorage
  ) { }

  ngOnInit() {}

  submit(f){
    f.date = f.date.day + '/' + f.date.month + '/' + f.date.year;
    this.storage.selectedReport.report.date = f.date;
    console.log(f);
    
    // this.service.editBasicReportDetails(this.authService.currentUser.id, this.storage.selectedReport.id, f)
    // .subscribe(result => {

    // });
  }
}
