import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { AuthService } from './auth.service';
import {AuthStoreService} from "../store/auth-store.service";
import {ToastrService} from "ngx-toastr";
interface Role {
  authority: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private router: Router,
              private authStoreService:AuthStoreService,
              private toastrService:ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    try {
      const requiredRoles = route.data['roles'] as string[];

      if (requiredRoles) {
        const auth = this.authStoreService.getAuthLogin();
        const userRoles = auth?.roles ;

        if (userRoles && userRoles.some((role: Role) => requiredRoles.includes(role?.authority))) {
          return true;
        } else {
          return this.navigateToLogin();
        }
      } else {
        return this.navigateToLogin();
      }
    } catch (error) {
      console.error('AuthorizationGuard error:', error);
      return this.navigateToLogin();
    }
  }

  private navigateToLogin(): boolean {
    this.toastrService.error("You do not have permission to access this page. Please log in with a valid account.","Unauthorized Access")
    this.router.navigate(['/auth/login']);
    return false;
  }
}
