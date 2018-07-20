import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { MarkAttendanceComponent } from '../../campus/mark-attendance/mark-attendance.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AddVolunteerComponent } from '../../admin/volunteer/add-volunteer/add-volunteer.component';
import { VolunteerManagerComponent } from '../../admin/volunteer/volunteer-manager/volunteer-manager.component';
import { ViewVolunteersComponent } from '../../admin/volunteer/view-volunteers/view-volunteers.component';
import { MembersManagerComponent } from '../../admin/members/members-manager/members-manager.component';
import { ViewMembersComponent } from '../../admin/members/view-members/view-members.component';
import { AddMemberComponent } from '../../admin/members/add-member/add-member.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { InstrumentsComponent } from '../../admin/instruments/instruments.component';
import { ManageDonationCategoriesComponent } from '../../admin/manage-donation-categories/manage-donation-categories.component';
import { ManageCampusComponent } from '../../admin/manage-campus/manage-campus.component';
import { TrusteeComponent } from '../../admin/trustee/trustee.component';
import { ReportDetailsManagerComponent } from '../../campus/report-details-manager/report-details-manager.component';
import { BasicDetailsComponent } from '../../campus/basic-details/basic-details.component';
import { WorshipDetailsComponent } from '../../campus/worship-details/worship-details.component';
import { SermonDetailComponent } from '../../campus/sermon-detail/sermon-detail.component';
import { EndingDetailsComponent } from '../../campus/ending-details/ending-details.component';
import { CampusMembersManagerComponent } from '../../campus/manage-members/campus-members-manager/campus-members-manager.component';
import { AddCampusMemberComponent } from '../../campus/manage-members/add-campus-member/add-campus-member.component';
import { ViewCampusMembersComponent } from '../../campus/manage-members/view-campus-members/view-campus-members.component';
import { DonationManagerComponent } from '../../volunteer/donation-manager/donation-manager.component';
import { GeneralDonationComponent } from '../../volunteer/general-donation/general-donation.component';
import { ChequeDonationComponent } from '../../volunteer/cheque-donation/cheque-donation.component';
import { TitheDonationComponent } from '../../volunteer/tithe-donation/tithe-donation.component';
import { TrusteeReportsComponent } from '../../trustee/trustee-reports/trustee-reports.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    DataTablesModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
     }),
    AngularMultiSelectModule,
  ],
  declarations: [
    DashboardComponent,
    MarkAttendanceComponent,
    AddVolunteerComponent,
    VolunteerManagerComponent,
    ViewVolunteersComponent,
    MembersManagerComponent,
    ViewMembersComponent,
    AddMemberComponent,
    InstrumentsComponent,
    ManageDonationCategoriesComponent,
    ManageCampusComponent,
    TrusteeComponent,

    ReportDetailsManagerComponent,
    BasicDetailsComponent,
    WorshipDetailsComponent,
    SermonDetailComponent,
    EndingDetailsComponent,

    CampusMembersManagerComponent,
    AddCampusMemberComponent,
    ViewCampusMembersComponent,

    DonationManagerComponent,
    GeneralDonationComponent,
    ChequeDonationComponent,
    TitheDonationComponent,

    TrusteeReportsComponent
  ]
})

export class AdminLayoutModule {}
