import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-confirm-register',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
  ],
  templateUrl: './confirm-register.component.html',
  styleUrl: './confirm-register.component.css'
})
export class ConfirmRegisterComponent {
  otp= '';
  constructor(private authService:AuthService,
              private router:Router,
              private toastrService:ToastrService,
              private readonly dialogRef: MatDialogRef<ConfirmRegisterComponent>,) {
  }

  handleSubmit() {
    this.authService.confirmRegister(this.otp || '') // Use the otp value or an empty string if undefined
      .subscribe(
        value => {
          this.toastrService.success('Create new account successful', 'Successful');
          this.dialogRef.close(); // Close the dialog here after successful submission
          this.router.navigate(['/auth/login']);
        },
        error => {
          this.toastrService.error('Create new account failed', 'Failed');
        }
      );
  }
}
