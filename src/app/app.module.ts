import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service'

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component'
import { AuthGuard } from './services/auth-guard.service';
import { NoAccessComponent } from './no-access/no-access.component';
import { BackEndCalls } from "./services/backend-calls.service";
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ReportDetailsService } from './volunteer/report-details.sevice';
import { ReportDetailAuthguard } from './services/report-detail-authguard.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    SweetAlert2Module.forRoot()
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
    ReportDetailAuthguard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
