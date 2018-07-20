import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

  canActivate(route, state: RouterStateSnapshot) {
    if(this.authService.currentUser.type == "admin")
      return true;
    
    this.router.navigate(['/no-access']);
    return false;
  }
}
