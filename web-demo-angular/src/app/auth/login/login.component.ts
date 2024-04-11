import {Component, inject, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field"; // Import MatFormFieldModule
import { MatInputModule } from "@angular/material/input"; // Import MatInputModule
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrModule, ToastrService} from "ngx-toastr";
import { Observable } from 'rxjs';
import { AuthStoreService } from '../service/store/auth-store.service';
import {AuthService} from "../service/auth/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ]
})
export class LoginComponent {
  constructor(private authService:AuthService,
              private authStoreService:AuthStoreService) {
  }
  hidePassword: boolean = true;
  loginForm = new FormGroup(
    {
      username: new FormControl(''),
      password: new FormControl('')
    }
  );

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  handleSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')!.value;
      const password = this.loginForm.get('password')!.value;
      const login = {username:username ||'', password: password ||''}
      try {
        this.authService.login(login);
      } catch (error) {
        console.error('Login error:', error);
      }
    } else {
      console.error('Form is invalid');
      // Display form validation errors to the user
    }
  }
}
