import {Component, importProvidersFrom, Injectable, OnInit} from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import {Navigation, Router, RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import { AvatarComponent } from '../../layout/images/avatar/avatar.component';
// import {AuthorizationService} from "../service/authorization.service";
import {ProfileService} from "./service/profile.service";
import {AuthStoreService} from "../auth/service/store/auth-store.service";
import {AuthService} from "../auth/service/auth/auth.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";

import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'any'
})
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    AvatarComponent,
    FooterComponent,
    RouterLink,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profile :any;
  jwt :any;
  roles: string[] = [];
  auth: any;
  constructor(
              private profileService:ProfileService,
              private authStoreService:AuthStoreService,
              private authService:AuthService,
              private storage: AngularFireStorage,
              private toastrService:ToastrService,
  ) { }

  ngOnInit(): void {

    this.auth = this.authStoreService.getAuthLogin();
    this.jwt = this.auth?.accessToken || '';
    this.getProfile(this.jwt)
  }

  getProfile(accessToken:string){
    if (accessToken !== "") {
      this.authService.profile(accessToken).subscribe(
        (data: any) => {
          this.profile = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  handleFileValue(file: File | null) {
    if (file) {
      const path = `images/${file.name}`;
      const storageRef = this.storage.ref(path);
      const uploadTask = this.storage.upload(path, file);

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            this.profileService.updateImageProfile(this.jwt,downloadURL).subscribe(
              value =>{
                this.toastrService.success("Your profile image has been updated successfully!", "Image Updated");
              }, error => {
                this.toastrService.error("Failed to update your profile image. Please try again.", "Update Error")
              }
            )
          }, error => {
            this.toastrService.error("There was an error uploading your image. Please try again.", "Upload Error")          });
        })
      ).subscribe();
      this.getProfile(this.jwt);
    }
  }

}
