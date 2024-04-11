import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../service/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {ConfirmRegisterComponent} from "../register/confirm-register/confirm-register.component";
import {ConfirmEmailComponent} from "./confirm-email/confirm-email.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [MatCardModule, MatFormField, MatInput, NgIf, ReactiveFormsModule, MatButton, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';
  constructor(private dialog: MatDialog,
              private authService:AuthService,
              private toastrService:ToastrService,
              private router: Router) {
  }

  handleSubmit() {
    this.authService.forgotPassword(this.email).subscribe(
      () => {
        this.openDialog();
        this.toastrService.success('An email with OTP has been sent to your email address.');
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

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmEmailComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
