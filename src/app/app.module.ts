import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { AuthService } from './services/AuthGuards/auth.service'

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component'
import { AuthGuard } from './services/AuthGuards/auth-guard.service';
import { NoAccessComponent } from './no-access/no-access.component';
import { BackEndCalls } from "./services/BackendHandling/backend-calls.service";
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ReportDetailsService } from './volunteer/report-details.sevice';
import { ReportDetailAuthguard } from './services/AuthGuards/report-detail-authguard.service';
import { DataStorage } from './services/Providers/DataStorage';

const jwtConf = {
  config: {
    tokenGetter: tokenGetter,
    whitelistedDomains: ['grace-fellowship.herokuapp.com'],
    throwNoTokenError: true,
    authScheme: ' ',
    globalHeaders: [{'Content-Type': 'application/json'}],
  }
};

export function tokenGetter() {
  return localStorage.getItem('token');
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
    AngularMultiSelectModule,
    JwtModule.forRoot(jwtConf),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    NoAccessComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    BackEndCalls,
    ReportDetailsService,
    ReportDetailAuthguard,
    DataStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
