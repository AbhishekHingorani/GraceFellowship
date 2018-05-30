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
import { BackEndCalls } from "./services/backend-calls.service"

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule.forRoot()
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
    BackEndCalls
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
