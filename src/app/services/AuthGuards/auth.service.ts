import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt'; 
import 'rxjs/add/operator/map'; 
import { Router } from '@angular/router';
import {BackEndCalls} from '../BackendHandling/backend-calls.service';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private http: Http) {
  }

  login(credentials) { 
    return this.http.post( BackEndCalls.BACKEND_URL + '/login', JSON.stringify(credentials))
     .map(response => {
       let result = response.json();
       
       console.log(result);

       if (result && result.token) {
        localStorage.setItem('token', result.token);
        //  let jwt = new JwtHelper();
        //  this.currentUser = jwt.decodeToken(localStorage.getItem('token'));
        
         return true; 
       }
       else return false; 
     });
   }

  logout() { 
    localStorage.removeItem("token")
    this.router.navigate(['/login']);
  }

  isLoggedIn() { 
    return tokenNotExpired('token');
  }

  get currentUser() {
    let token = localStorage.getItem('token');
    if(!token) return null;
    return new JwtHelper().decodeToken(token);
  }
}
