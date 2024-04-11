import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthStoreService} from "../../auth/service/store/auth-store.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }
  updateProfile(accessToken: string, profile: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post('http://localhost:8080/profile/upload', profile, { withCredentials: true, headers: headers });
  }
  updateImageProfile(accessToken: string, urlImage: ""): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post('http://localhost:8080/profile/upload/avatar', {avatar:urlImage}, { withCredentials: true, headers: headers });
  }
  changePasswordProfile(accessToken: string, form: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post('http://localhost:8080/profile/change-password', form, { withCredentials: true, headers: headers });
  }
}
