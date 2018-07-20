import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DataStorage } from '../../services/Providers/DataStorage';
import { AuthService } from '../../services/AuthGuards/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackEndCalls } from '../../services/BackendHandling/backend-calls.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { DonationModel } from '../../interfaces/DonationModel';
import { Report, ReportModel } from '../../interfaces/ReportModel';

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
    public router: Router, 
    public activatedRoute: ActivatedRoute, 
    public cd: ChangeDetectorRef,
    public service: BackEndCalls,
    public modalService: NgbModal,
    public authService: AuthService,
    public storage: DataStorage
  ) {}

  ngOnInit() {
    //this.isLoading= false;
    if(this.storage.allReports){
      this.reportsList = this.storage.allReports;
      this.isLoading = false;
      
      if(!this.storage.donation.report)
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
    this.service.getAllReports_Volunteer(this.authService.currentUser.id)
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
    this.service.getSingleDonationReport(this.authService.currentUser.id, id)
    .subscribe((data: DonationModel) => {
      let i = this.storage.allReports.findIndex(x => x.id==id);
      data.report = this.storage.allReports[i];
      this.storage.donation = data;
      this.isLoading = false;
    },
    error => {
      swal('Error', 'There was some error selecting the report, try again later', 'error');
      this.isLoading = false;
    });
  }
}
