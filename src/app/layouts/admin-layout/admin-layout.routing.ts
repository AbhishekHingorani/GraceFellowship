import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { MarkAttendanceComponent } from '../../volunteer/mark-attendance/mark-attendance.component';
import { VolunteerAuthGuard } from '../../services/AuthGuards/volunteer-auth-guard.service';
import { CampusAuthGuard } from '../../services/AuthGuards/campus-auth-guard.service';
import { AdminAuthGuard } from '../../services/AuthGuards/admin-auth-guard.service';
import { AddVolunteerComponent } from '../../admin/volunteer/add-volunteer/add-volunteer.component';
import { VolunteerManagerComponent } from '../../admin/volunteer/volunteer-manager/volunteer-manager.component';
import { MembersManagerComponent } from '../../admin/members/members-manager/members-manager.component';
import { InstrumentsComponent } from '../../admin/instruments/instruments.component';
import { ManageDonationCategoriesComponent } from '../../admin/manage-donation-categories/manage-donation-categories.component';
import { ManageCampusComponent } from '../../admin/manage-campus/manage-campus.component';
import { TrusteeComponent } from '../../admin/trustee/trustee.component';
import { ReportDetailsManagerComponent } from '../../volunteer/report-details-manager/report-details-manager.component';
import { CampusMembersManagerComponent } from '../../volunteer/manage-members/campus-members-manager/campus-members-manager.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },

    //---------------------------------------------------------------------------------------------//

    { path: 'admin/add-volunteer', component: AddVolunteerComponent, canActivate: [AdminAuthGuard]},
    { path: 'admin/volunteer/:id', component:VolunteerManagerComponent, canActivate:[AdminAuthGuard]},
    { path: 'admin/volunteer', component: VolunteerManagerComponent, canActivate: [AdminAuthGuard]},
    { path: 'admin/member/:id', component: MembersManagerComponent, canActivate: [AdminAuthGuard]},
    { path: 'admin/member', component: MembersManagerComponent, canActivate: [AdminAuthGuard]},
    { path: 'admin/instruments', component: InstrumentsComponent, canActivate: [AdminAuthGuard]},
    { path: 'admin/donationCategories', component: ManageDonationCategoriesComponent, canActivate: [AdminAuthGuard]},
    { path: 'admin/manageCampus', component: ManageCampusComponent, canActivate: [AdminAuthGuard]},
    { path: 'admin/trustee', component: TrusteeComponent, canActivate: [AdminAuthGuard]},

    //-----------------------------------------------------------------------------------------//    
    
    { path: 'campus/report-detail-manager', component: ReportDetailsManagerComponent},
    { path: 'campus/campus-members-manager', component: CampusMembersManagerComponent},
    { path: 'campus/campus-members-manager/:id', component: CampusMembersManagerComponent}
];
