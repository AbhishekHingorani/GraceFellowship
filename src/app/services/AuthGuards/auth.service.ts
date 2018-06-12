import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw'; 
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import {BackEndCalls} from '../BackendHandling/backend-calls.service';
import {HttpHeaders, HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private http: Http,private service: BackEndCalls, public jwtHelper: JwtHelperService) {}


  login(credentials) { 
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    const options = new RequestOptions({
      headers: new Headers({'content-type': 'application/json'})
    });

    return this.http.post( this.service.getURL() + '/login', JSON.stringify(credentials), options)
     .map(result => {
       console.log("yeah...");
       let response = result.json();
       let token = response['token'];
        if (token) {          
          localStorage.setItem('token', token);
          return true; 
        }
        else
          return false; 
      })
      .catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse){
    console.log(error.status);
    if(error.status == 500)
      return Observable.throw("Internal Server Error");
    else if(error.status == 400 || error.status == 401)
      return Observable.throw("Invalid Credentials");
  }

  logout() { 
    localStorage.removeItem("token")
    this.router.navigate(['/login']);
  }

  isLoggedIn() { 
    let token = localStorage.getItem('token');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  get currentUser() {
    let token = localStorage.getItem('token');
    if(!token) return null;
    return this.jwtHelper.decodeToken(token);
  }
}
