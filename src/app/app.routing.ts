import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/AuthGuards/auth-guard.service';
import { NoAccessComponent } from './no-access/no-access.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }, 
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ],
    canActivate: [AuthGuard]    
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'no-access',
    component: NoAccessComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    canActivate: [AuthGuard]    
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
