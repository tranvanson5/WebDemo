import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [
    MatButton,
    MatDialogContent,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent {
  otp= '';
  constructor(private authService:AuthService,
              private router:Router,
              private toastrService:ToastrService,
              private readonly dialogRef: MatDialogRef<ConfirmEmailComponent>,) {
  }

  handleSubmit() {
    this.authService.confirmForgotPassword(this.otp).subscribe(
      () => {
        this.dialogRef.close();
        this.toastrService.success('You have successfully verified and changed your password.', 'Success');
        this.router.navigate(['/auth/forgot-password/change-password']);
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
