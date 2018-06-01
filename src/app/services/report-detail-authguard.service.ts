import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ReportDetailsService } from '../volunteer/report-details.sevice'

@Injectable({
  providedIn: 'root'
})
export class ReportDetailAuthguard implements CanActivate{

  constructor(
    private router: Router,
    private reportDetails: ReportDetailsService
  ) { }

  canActivate(route, state: RouterStateSnapshot) {
    if(this.reportDetails.isReportDetailAvailable())
      return true;
    
    this.router.navigate(['/report-detail']);
    
    //Add sweet alert here
    console.log("gher jaa");
    
    return false;
  }
}
