import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AuthHttp, AUTH_PROVIDERS, provideAuth, AuthConfig } from 
'angular2-jwt/angular2-jwt';

import { AuthService } from './services/AuthGuards/auth.service'

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component'
import { AuthGuard } from './services/AuthGuards/auth-guard.service';
import { NoAccessComponent } from './no-access/no-access.component';
import { BackEndCalls } from "./services/BackendHandling/backend-calls.service";
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ReportDetailsService } from './volunteer/report-details.sevice';
import { ReportDetailAuthguard } from './services/AuthGuards/report-detail-authguard.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    NoAccessComponent,
  ],
  providers: [
    AuthService,
    AuthGuard,
    BackEndCalls,
    ReportDetailsService,
    ReportDetailAuthguard,
    AUTH_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
