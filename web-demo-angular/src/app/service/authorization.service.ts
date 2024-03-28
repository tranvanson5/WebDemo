import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private router: Router, private toastr: ToastrService) { }

  checkUserRoles(allowedRoles: string[], userRoles: string[]): boolean {
    const intersection = allowedRoles.filter(role => userRoles.includes(role));

    if (intersection.length === 0) {
      this.toastr.error('You do not have permission to access this page.', 'Authorization error');
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
