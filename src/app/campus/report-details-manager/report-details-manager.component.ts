import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDateStruct, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BackEndCalls } from '../../services/BackendHandling/backend-calls.service';
import { AuthService } from '../../services/AuthGuards/auth.service';
import { DataStorage } from '../../services/Providers/DataStorage';
import { ReportModel, Report } from "../../interfaces/ReportModel";
import swal from 'sweetalert2';

let now = new Date();

@Component({
  selector: 'report-details-manager',
  templateUrl: './report-details-manager.component.html',
  styleUrls: ['./report-details-manager.component.scss']
})
export class ReportDetailsManagerComponent implements OnInit {

  model: NgbDateStruct;
  time= "00:00:00";
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
    this.setCurrentTime();
    
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

  setCurrentTime(){
    now = new Date();
    
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    
    if(now.getMinutes() < 10)
      this.time = now.getHours() + ":0" + now.getMinutes();
    else
      this.time = now.getHours() + ":" + now.getMinutes();  

    if(now.getHours() < 10)
      this.time = "0" + this.time;
  }

  getAllreports(){
    this.service.getAllReports(this.authService.currentUser.id)
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
    this.isLoading = true;

    this.service.getSingleReport(this.authService.currentUser.id, id)
    .subscribe((data: ReportModel) => {
      console.dir(data);
      let date = data.report.date.split('/').map(Number);
      data.report.dateModel = {year: date[2], month: date[1], day: date[0]}; 

      this.storage.selectedReport = data;

      let d = this.storage.selectedReport.report;

      this.isLoading = false;
    },
    error => {
      swal('Error', 'There was some error selecting the report, try again later', 'error');
      this.isLoading = false;
    });
  }

  generateNewReport(f){
    this.isLoading = true;
    
    let data: any = {}; 
    data = {
      language: f.language,
      date: f.date.day + '/' + f.date.month + '/' + f.date.year,
      filedby: f.filedBy,
      begining: {
        start: f.beginTime,
        prayer: f.prayer
      }
    }

    this.service.addNewReport(this.authService.currentUser.id, data)
    .subscribe((result: ReportModel) => {
       this.storage.selectedReport = result;
      this.storage.selectedReport.report.dateModel = {year: f.date.year, month: f.date.month, day: f.date.day}; 

      this.storage.allReports.push(data);  //and pushing data obj to array
      this.isLoading = false;
    },
    error => {
      swal('Error', 'There was some error creating a new report, please try again later', 'error');
      this.isLoading = false;
    });
  }

  deleteReport(id){
    //deleting from storage service
    let index = this.storage.allReports.map(function(x){ return x.id; }).indexOf(id);
    let deletedReport = this.storage.allReports[index]; //saving a copy of report to be deleted
    this.storage.allReports.splice(index,1);
        
    this.service.deleteReport(this.authService.currentUser.id, id)
    .subscribe(data => {
      if(data < 1 || data == null){
        swal('Error','There was an error deleting the Report','error');
        this.storage.allReports.push(deletedReport) //Adding deleted report back on faliure.
      }
    },
    error => {
      swal('Error','There was an error deleting the Report','error');
      this.storage.allReports.push(deletedReport) //Adding deleted report back on faliure.
    });
  }
}
