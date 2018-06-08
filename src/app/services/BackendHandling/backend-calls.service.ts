import { Injectable } from '@angular/core';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class BackEndCalls
{
  constructor(private authHttp: AuthHttp, private http: Http) {}

  //public static BACKEND_URL = "https://grace-fellowship.herokuapp.com";
  public static BACKEND_URL = "http://5b18c6fd3f38e20014a22f3f.mockapi.io";

  //=====================================================================//
  //---------------------------- ADMIN ---------------------------------//
  //===================================================================//

  getAllVolunteers(){
    return this.http.get(BackEndCalls.BACKEND_URL + '/admin/1/volunteers')
  }
  
  getVolunteer(volunteerId){
    return this.http.get(BackEndCalls.BACKEND_URL + '/admin/1/volunteers/' + volunteerId)
  }
  
  deleteVolunteer(volunteerId){
    return this.http.delete(BackEndCalls.BACKEND_URL + '/admin/1/volunteer/' + volunteerId)
  }
}
