import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ConfirmRegisterComponent} from "./confirm-register/confirm-register.component";
import {AuthService} from "../service/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    RouterLink,
    MatCardFooter,
    MatButton,
    MatError,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl(null,Validators.required),
    username: new FormControl(null,[Validators.required,Validators.minLength(6)]),
    email: new FormControl(null,[Validators.required, Validators.email]),
    password: new FormControl(null,[Validators.required, Validators.minLength(8)]),
    repassword: new FormControl(null,[Validators.required, this.confirmPasswordValidator()]),
  })
  hidePassword=true;

  confirmPasswordValidator(): ValidatorFn {
    return (): { [key: string]: any } | null => {
      const newPassword = this.registerForm?.get('password')?.value ||'';
      const reNewPassword =this.registerForm?.get('repassword')?.value ||'';
      if (newPassword !== reNewPassword) {
        return { mismatch: true };
      }
      return null;
    };
  }

  constructor(private dialog: MatDialog, private authService:AuthService, private toastrService:ToastrService) {
  }

  handleSubmit() {
    if(this.registerForm.valid){
      const register= {
        name: this.registerForm.value.name||'',
        email: this.registerForm.value.email||'',
        username: this.registerForm.value.username||'',
        password: this.registerForm.value.password||'',
      }
      this.authService.register(register).subscribe({
        next: (response) => {
          this.toastrService.success("Send mail otp successful", "Successful")
          this.openDialog();
        },
        error: (error) => {
          this.toastrService.error('Send mail otp failed','failed');
        }
      });
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmRegisterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
