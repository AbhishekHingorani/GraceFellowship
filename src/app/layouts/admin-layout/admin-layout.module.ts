import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { MarkAttendanceComponent } from '../../volunteer/mark-attendance/mark-attendance.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ReportDetailComponent } from '../../volunteer/report-detail/report-detail.component';
import { AddVolunteerComponent } from '../../admin/volunteer/add-volunteer/add-volunteer.component';
import { VolunteerManagerComponent } from '../../admin/volunteer/volunteer-manager/volunteer-manager.component';
import { ViewVolunteersComponent } from '../../admin/volunteer/view-volunteers/view-volunteers.component';


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
    MarkAttendanceComponent,
    ReportDetailComponent,
    AddVolunteerComponent,
    VolunteerManagerComponent,
    ViewVolunteersComponent,
  ]
})

export class AdminLayoutModule {}
