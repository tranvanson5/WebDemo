import { Component } from '@angular/core';
import {Validators, FormGroup, FormControl, ValidationErrors, AbstractControl, ValidatorFn} from '@angular/forms'; // Import Validators for built-in validation functions
import { MatButton } from "@angular/material/button";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {ProfileService} from "../service/profile.service";
import {AuthStoreService} from "../../auth/service/store/auth-store.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatRadioButton,
    MatRadioGroup,
    MatSuffix,
    ReactiveFormsModule,
    MatIcon,
    MatLabel,
    NgIf
  ],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  passwordForm = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    reNewPassword: new FormControl('', [Validators.required,this.confirmPasswordValidator()])
  });

  hideOldPassword = true;
  hideNewPassword = true;
  hideReNewPassword = true;

  constructor(private profileService:ProfileService,
              private authStoreService:AuthStoreService,
              private toastrService:ToastrService) {}

  handleSubmit() {
    if (this.passwordForm.valid) {
      this.profileService.changePasswordProfile(
        this.authStoreService.getAuthLogin().accessToken,
        this.passwordForm.value
      ).subscribe(
        value => {
          this.toastrService.success('Password changed successfully', 'Success');
          this.passwordForm.reset();
        },
        error => {
          this.toastrService.error('Failed to change password', 'Error');
        }
      );
    }
  }


  togglePasswordVisibility(field: string): void {
    if (field === 'old') {
      this.hideOldPassword = !this.hideOldPassword;
    } else if (field === 'new') {
      this.hideNewPassword = !this.hideNewPassword;
    } else if (field === 'renew') {
      this.hideReNewPassword = !this.hideReNewPassword;
    }
  }

  confirmPasswordValidator(): ValidatorFn {
    return (): { [key: string]: any } | null => {
      const newPassword = this.passwordForm?.get('newPassword')?.value ||'';
      const reNewPassword =this.passwordForm?.get('reNewPassword')?.value ||'';
      if (newPassword !== reNewPassword) {
        return { mismatch: true };
      }
      return null;
    };
  }



}
