import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
//import { LoginComponent } from '../../login/login.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    //{ path: 'login',          component: LoginComponent}
];
