import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { AuthService } from './../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route, state: RouterStateSnapshot) {
    if(this.authService.currentUser.type == "admin")
      return true;
    
    this.router.navigate(['/no-access']);
    return false;
  }
}
