import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { MarkAttendanceComponent } from '../../volunteer/mark-attendance/mark-attendance.component';
import { VolunteerAuthGuard } from '../../services/AuthGuards/volunteer-auth-guard.service';
import { AdminAuthGuard } from '../../services/AuthGuards/admin-auth-guard.service';
import { ReportDetailComponent } from '../../volunteer/report-detail/report-detail.component';
import { ReportDetailAuthguard } from '../../services/AuthGuards/report-detail-authguard.service';
import { AddVolunteerComponent } from '../../admin/volunteer/add-volunteer/add-volunteer.component';
import { VolunteerManagerComponent } from '../../admin/volunteer/volunteer-manager/volunteer-manager.component';
import { MembersManagerComponent } from '../../admin/members/members-manager/members-manager.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'admin/add-volunteer', component: AddVolunteerComponent, canActivate: [AdminAuthGuard]},
    { path: 'admin/volunteer/:id', component: VolunteerManagerComponent, canActivate: [AdminAuthGuard]},
    { path: 'admin/volunteer', component: VolunteerManagerComponent, canActivate: [AdminAuthGuard]},
    { path: 'admin/member/:id', component: MembersManagerComponent, canActivate: [AdminAuthGuard]},
    { path: 'admin/member', component: MembersManagerComponent, canActivate: [AdminAuthGuard]},

    
    { path: 'volunteer/mark-attendance', component: MarkAttendanceComponent, canActivate: [VolunteerAuthGuard, ReportDetailAuthguard]},
    { path: 'volunteer/report-detail', component: ReportDetailComponent}
];
