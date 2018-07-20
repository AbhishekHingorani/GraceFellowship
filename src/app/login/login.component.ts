import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from './../services/AuthGuards/auth.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  focus; focus1;
  invalidLogin: boolean = false; 
  isLoading: boolean = false;
  submitBtn: string = "Login";
  errorMsg: string = "";

  constructor(
    public router: Router, 
    public authService: AuthService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(){}

  signIn(credentials) {
    this.toggleLoading();
    
    this.authService.login(credentials)
      .subscribe(result => { 
        if (result){
          this.toggleLoading();
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
        }
        else 
          this.invalidLogin = true; 
      },
      error => {
        this.toggleLoading();
        this.errorMsg = error;
        this.invalidLogin = true;
      });
  } 

  toggleLoading(){
    if(this.isLoading){
      this.isLoading = false;
      this.submitBtn = "Login";
    }else{
      this.isLoading = true;
      this.submitBtn = "";
    }
  }
}
