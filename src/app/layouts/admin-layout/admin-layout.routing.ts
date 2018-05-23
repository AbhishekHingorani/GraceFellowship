import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AddMemberComponent } from '../../admin/add-member/add-member.component';
import { MarkAttendanceComponent } from '../../volunteer/mark-attendance/mark-attendance.component';
import { VolunteerAuthGuard } from '../../services/volunteer-auth-guard.service';
import { AdminAuthGuard } from '../../services/admin-auth-guard.service';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'add-member', component: AddMemberComponent, canActivate: [AdminAuthGuard]},
    { path: 'mark-attendance', component: MarkAttendanceComponent, canActivate: [VolunteerAuthGuard]},
];
