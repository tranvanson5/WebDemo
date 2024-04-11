import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AuthService} from "../../service/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  formPassword = new FormGroup({
    password: new FormControl(''),
    rePassword: new FormControl('')
  });

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  handleSubmit() {
    const password = this.formPassword.get('password')?.value || '';
    const rePassword = this.formPassword.get('rePassword')?.value || '';

    if (password !== rePassword) {
      this.toastrService.error('Passwords do not match', 'Error');
      return;
    }

    this.authService.changeNewPassword(password).subscribe(
      () => {
        this.toastrService.success('Password changed successfully', 'Success');
        this.router.navigate(['/auth/login']); // Navigate to login page after password change
      },
      (error) => {
        if (error.error) {
          this.toastrService.error(error.error, 'Error');
        } else {
          this.toastrService.error('An error occurred while processing your request.', 'Error');
        }
      }
    );
  }
}
