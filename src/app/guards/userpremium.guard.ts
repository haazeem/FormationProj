import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserpremiumGuard implements CanActivate {
  constructor(private us: UserService, private route: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let res = this.us.isLoggedPremiumUser();
    switch (res) {
      case '401': {
        this.route.navigate(['/Error401']);
        return false;
      }
      case '403': {
        this.route.navigate(['/Error403']);
        return false;
      }
    }
    return true;
  }
  
}
