import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import {  MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from "../../auth/service/auth/auth.service";
import {AuthStoreService} from "../../auth/service/store/auth-store.service";
import {ProfileService} from "../service/profile.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [MatIconModule,MatInputModule,MatFormFieldModule,MatRadioModule,MatDatepickerModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],

})
export class ProfileInfoComponent implements OnInit{
  profile :any;
  jwt: string = '';
  profileForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    gender: new FormControl(''),
    dob: new FormControl('2001-03-17'),
    phone: new FormControl(''),
    address: new FormControl('')
  });
  constructor(
    private authService:AuthService,
    private authStoreService: AuthStoreService,
    private profileService:ProfileService,
    private toastrService:ToastrService
  ) {
  }
  ngOnInit(): void {

    const auth = this.authStoreService.getAuthLogin();
    this.jwt = auth?.accessToken || '';
    this.getProfile(this.jwt)
  }
  getProfile(accessToken:string){
    if (accessToken !== "") {
      this.authService.profile(accessToken).subscribe(
        (data: any) => {
          this.profile = data;
          this.profileForm.patchValue(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  handleSubmit() {
    const formData = this.profileForm.value;
    this.profileService.updateProfile(this.jwt,formData).subscribe(
      data=>{
        this.getProfile(this.jwt)
        this.toastrService.success('Profile uploaded successfully', 'Upload Profile');
      },error => {
        this.toastrService.error('Profile uploaded failed', 'Upload Profile')
      }
    )
  }
  chosenDate(event: any): void {
    const selectedDate: Date = event.value;
    const formattedDate: string = selectedDate.toISOString().slice(0, 10);
    const dobControl = this.profileForm.get('dob');

    if (dobControl) { // Kiểm tra xem dobControl có null không
      dobControl.setValue(formattedDate);
    }
  }

}
