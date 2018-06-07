import { Injectable } from '@angular/core';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class BackEndCalls
{
  constructor(private authHttp: AuthHttp) {}

  //public static BACKEND_URL = "https://grace-fellowship.herokuapp.com";
  public static BACKEND_URL = "http://5b18c6fd3f38e20014a22f3f.mockapi.io";
}
