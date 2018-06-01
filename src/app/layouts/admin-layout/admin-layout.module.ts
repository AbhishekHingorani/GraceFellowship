import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AddMemberComponent } from '../../admin/add-member/add-member.component';
import { MarkAttendanceComponent } from '../../volunteer/mark-attendance/mark-attendance.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ReportDetailComponent } from '../../volunteer/report-detail/report-detail.component';


//import {LoginComponent} from '../../login/login.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
  })
  ],
  declarations: [
    DashboardComponent,
    AddMemberComponent,
    MarkAttendanceComponent,
    ReportDetailComponent
  ]
})

export class AdminLayoutModule {}
