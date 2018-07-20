import { Component, OnInit } from '@angular/core';
import { DataStorage } from '../../services/Providers/DataStorage';
import { BackEndCalls } from '../../services/BackendHandling/backend-calls.service';
import { AuthService } from '../../services/AuthGuards/auth.service';
import { TrusteeReportModel } from "../../interfaces/TrusteeReportModel";
import swal from 'sweetalert2';

@Component({
  selector: 'app-trustee-reports',
  templateUrl: './trustee-reports.component.html',
  styleUrls: ['./trustee-reports.component.scss']
})
export class TrusteeReportsComponent implements OnInit {

  years: number[] = [];
  submitBtn: string = "submit";
  isLoading = false;
  campusSummaryReports: TrusteeReportModel[];

  constructor(
    public storage: DataStorage,
    public service: BackEndCalls,
    public authService: AuthService,
  ) { }

  ngOnInit() {
    for (let i = new Date().getFullYear(); i >= 1900; i--) {
      this.years.push(i);
    }
  }

  submit(month, year){
    this.service.getAllTrusteeSummaryReports(this.authService.currentUser.id, month, year)
    .subscribe((data: TrusteeReportModel[]) => {
      this.campusSummaryReports = data;
    }, error =>{
      swal("Error","There was some error retriving the reports", "error");
    })
  }
}
