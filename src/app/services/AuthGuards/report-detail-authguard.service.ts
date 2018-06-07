import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ReportDetailsService } from '../../volunteer/report-details.sevice'
import swal from 'sweetalert2';

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
    
    swal(
      'You must enter Report Details first',
      'Enter Report details first and press next!',
      'error'
    )
    
    return false;
  }
}
