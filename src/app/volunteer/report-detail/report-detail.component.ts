import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ReportDetailsService } from '../report-details.sevice';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

const now = new Date();

@Component({
  selector: 'report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit {

  model: NgbDateStruct;
  date: {year: number, month: number};
  time= "00:00:00";

  constructor(private router: Router, private reportDetails: ReportDetailsService) {}

  ngOnInit() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    
    if(now.getMinutes() < 10)
      this.time = now.getHours() + ":0" + now.getMinutes();
    else
      this.time = now.getHours() + ":" + now.getMinutes();  

    if(now.getHours() < 10)
      this.time = "0" + this.time;
    
  }

  submit(form){
    this.reportDetails.date = form.date;
    this.reportDetails.language = form.language;
    this.reportDetails.volunteerName = form.volunteerName;

    console.log(this.reportDetails.isReportDetailAvailable());
    
    //http post

    this.router.navigate(['/mark-attendance']);
  }
}
