import {Component, OnInit} from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import {RouterLink, RouterOutlet} from '@angular/router';
import { AvatarComponent } from '../../layout/images/avatar/avatar.component';
import {AuthorizationService} from "../service/authorization.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    AvatarComponent,
    FooterComponent,
    RouterLink,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthorizationService) { }

  ngOnInit(): void {
    this.checkUserRoles();
  }

  checkUserRoles(): void {
    const allowedRoles = ["ROLE_USER","ROLE_ADMIN","ROLE_PM"]; // Các vai trò được phép truy cập
    const userRoles = ["ROLE_USER"]; // Vai trò của người dùng, có thể được truy xuất từ dịch vụ hoặc API
    this.authService.checkUserRoles(allowedRoles, userRoles);
  }
  handleFileValue(file: File | null) {
    if (file) {
      console.log('Received file:', file);
    }
  }
}
