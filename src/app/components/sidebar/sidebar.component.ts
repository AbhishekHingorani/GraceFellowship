import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/AuthGuards/auth.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    type: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '', type: 'all' },
    
    //----Admin Routes----//
    { path: '/admin/volunteer', title: 'Volunteer',  icon: 'sport_user-run', class: '', type: 'admin' },
    { path: '/admin/member', title: 'Member',  icon: 'users_single-02', class: '', type: 'admin' },
    { path: '/admin/instruments', title: 'Instruments',  icon: 'media-2_note-03', class: '', type: 'admin' },
    { path: '/admin/donationCategories', title: 'Donation Categories',  icon: 'design_bullet-list-67', class: '', type: 'admin' },

    //----Volunteer Routes----//
    { path: '/volunteer/report-detail', title: 'Report Detail',  icon: 'design_app', class: '', type: 'volunteer' },
    { path: '/volunteer/mark-attendance', title: 'Mark Attendance',  icon: 'design_app', class: '', type: 'volunteer' },    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };

  shouldBeVisible(type: string)
  {
    if(this.authService.currentUser && (this.authService.currentUser.type == type || type=="all"))
        return true;
    else 
        return false;
  }
}
