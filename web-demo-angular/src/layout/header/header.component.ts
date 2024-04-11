import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { Router, NavigationEnd } from '@angular/router';
import {CommonModule} from "@angular/common";
import {AuthStoreService} from "../../app/auth/service/store/auth-store.service";
import {AuthService} from "../../app/auth/service/auth/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  currentRoute: string = '';
  profile: any; // Đảm bảo rằng profile được khai báo với kiểu dữ liệu phù hợp
  avatarDefault = "https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.300.jpg";

  constructor(
    private router: Router,
    private authStoreService: AuthStoreService,
    private authService: AuthService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        console.log(this.currentRoute);
      }
    });
  }

  ngOnInit(): void {
    const auth = this.authStoreService.getAuthLogin();
    const accessToken = auth?.accessToken || '';
    if (accessToken !== "") {
      this.authService.profile(accessToken).subscribe(
        (data: any) => {
          this.profile = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
