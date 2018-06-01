import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
export class ReportDetailsService {
    date: {year: number, month: number, day: number};
    volunteerName: string;
    language: string;


    isReportDetailAvailable(){
        if(this.date && this.volunteerName && this.language)
            return true;

        return false;
    }
}