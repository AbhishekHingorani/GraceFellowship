import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DataStorage } from '../../services/Providers/DataStorage';
import { AuthService } from '../../services/AuthGuards/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackEndCalls } from '../../services/BackendHandling/backend-calls.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'donation-manager',
  templateUrl: './donation-manager.component.html',
  styleUrls: ['./donation-manager.component.scss']
})
export class DonationManagerComponent implements OnInit {

  isLoading: boolean = true;
  reportsList;

  @ViewChild('tabs') ngbTabSet;
  @ViewChild('reportsModal') reportsModal;
  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private cd: ChangeDetectorRef,
    private service: BackEndCalls,
    private modalService: NgbModal,
    private authService: AuthService,
    private storage: DataStorage
  ) {}

  ngOnInit() {
    //this.isLoading= false;
    if(this.storage.allReports){
      this.reportsList = this.storage.allReports;
      this.isLoading = false;
      
      if(!this.storage.selectedReport)
        this.open(this.reportsModal)
    }else
      this.getAllreports();
  }

  ngAfterViewInit(){
    let tab;

    this.activatedRoute.queryParamMap
      .subscribe(params => {
        tab = params.get('tab');    //getting tab: string from query params
        if(tab != null && this.storage.selectedReport)
          this.ngbTabSet.select(tab); //Changing the tab
        this.cd.detectChanges();
      });
  }

  tabChange(e){
    this.router.navigate(
      ['.'], 
      { relativeTo: this.activatedRoute, queryParams: {tab: e} }  //adding tab to query parameters
    );
  }

  open(content) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  getAllreports(){
    //this.service.getAllReports_Volunteer(this.authService.currentUser.id)
    this.service.getAllReports_Volunteer('6da66d7a-e942-4c83-adfd-7ead7ac68e6b')
    .subscribe(data => {
      this.reportsList = data;
      this.storage.allReports = this.reportsList;
      this.isLoading = false;

      if(!this.storage.selectedReport)
        this.open(this.reportsModal)
    },
    error => {
      swal('Error', 'There was some error retriving reports, try again later', 'error');
      this.isLoading = false;
    });
  }

  selectReport(id){
    //this.isLoading = true;
    swal(id);

    // this.service.getSingleReport(this.authService.currentUser.id, id)
    // .subscribe((data: ReportModel) => {
    //   console.dir(data);
    //   let date = data.report.date.split('/').map(Number);
    //   data.report.dateModel = {year: date[2], month: date[1], day: date[0]}; 

    //   this.storage.selectedReport = data;

    //   let d = this.storage.selectedReport.report;

    //   this.isLoading = false;
    // },
    // error => {
    //   swal('Error', 'There was some error selecting the report, try again later', 'error');
    //   this.isLoading = false;
    // });
  }

  /*
  let data =  {
      general: [
        { "denom":"10", "quantity":5 },
        { "denom":"100", "quantity":10 }
      ],
      cheque: [
        { "name":"qwe", "bank":"asd", "cheque_no":"123",
          "cheque_date":"12-2-18", "amount":123
        },
        { "name":"qwe", "bank":"asd", "cheque_no":"123",
          "cheque_date":"12-2-18", "amount":123
        }
      ],
      tithe: [
        { "name":"poi", "amount":5000 },
        { "name":"lkj", "amount":1000 }
      ]
    }
  */

}
