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

  constructor(private http:HttpClient,
              private toastrService:ToastrService,
              private router:Router,
  ) {
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

      // Use HttpClient directly or call a method in AuthService that uses HttpClient
      this.http.post<any>('http://localhost:8080/auth/signin', { username, password }, { withCredentials: true })
        .subscribe({
          next: (response) => {
            this.router.navigate(['../'])
            this.toastrService.success("Login successful! Have a great day!","Login successful");
            // this.treeStoreService.setNode("auth",{name:"login", response});
          },
          error: (error) => {
            console.error('Login failed:', error);
            // Handle login errors (display error messages, etc.)
          }
        });
    } else {
      console.error('Form is invalid');
    }
  }
}
