import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isConnected: boolean;
  isLogin: boolean;
  isContact: boolean;
  isPricing: boolean;
  url;
  constructor(private router: Router, private us: UserService, private admin: AdminService) { }

  ngOnInit() {
    this.isConnected = (!!localStorage.getItem('token'));
    this.isLogin = (this.router.url === "/login") ? true : false;
    this.isContact = (this.router.url === "/contact") ? true : false;
    this.isPricing = (this.router.url === "/pricing") ? true : false;
    let resfreeUser = (this.us.isLoggedFreeUser());
    let resPremiumUser = this.us.isLoggedPremiumUser();
    let resAdmin = this.admin.isLoggedAdmin();
    if (resfreeUser == true) {
      this.url="/dashboard";
    } else {
      if (resPremiumUser == true) {
        this.url="/dashboard-user"
      } else {
        if (resAdmin == true) {
          this.url="/dashboardAdmin"
        }
      }
    }
  }

}
