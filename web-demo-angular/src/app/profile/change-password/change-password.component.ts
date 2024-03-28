import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";

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
    MatLabel
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  passwordForm= new FormGroup(
    {
      oldPassword: new FormControl(''),
      newPassword: new FormControl(''),
      reNewPassword: new FormControl(''),
    }
  );
  hideOldPassword = true;
  hideNewPassword = true;
  hideReNewPassword = true;

  handleSubmit() {
    // Implement your form submission logic here
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

}
