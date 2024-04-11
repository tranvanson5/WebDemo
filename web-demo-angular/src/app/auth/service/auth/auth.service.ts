import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthStoreService} from "../store/auth-store.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private authStoreService:AuthStoreService,
              private toastrService:ToastrService,
              private router:Router) { }

  login(login= {username:'',password:''}){
    this.http.post<any>('http://localhost:8080/auth/signin', login, { withCredentials: true })
      .subscribe({
        next: (response) => {
          this.authStoreService.setAuthLogin(response);
          this.router.navigate(['/'])
          this.toastrService.success("Login successful! Have a great day!", "Login successful")
        },
        error: (error) => {
          this.toastrService.error('Login failed');
          console.error('Login failed:', error);
        }
      });
  }
  profile(accessToken:string): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get('http://localhost:8080/profile/get', { withCredentials: true, headers: headers });
  }
  register(register= {name:'',username:'',password:'',email:''}): Observable<any>{
    return this.http.post<any>('http://localhost:8080/auth/signup', register, {withCredentials: true});
  }

  confirmRegister(otp: string): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/auth/signup/verify?otp=${otp}`, {withCredentials: true});
  }

  forgotPassword(email: string): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/auth/forgot-password?email=${email}`, { withCredentials: true });
  }

  confirmForgotPassword(otp: string): Observable<any>{
    console.log(otp);
    return this.http.get<any>(`http://localhost:8080/auth/forgot-password/verify?otp=${otp}`, { withCredentials: true });
  }
  changeNewPassword(password:string): Observable<any>{
    return this.http.post<any>(`http://localhost:8080/auth/forgot-password/change-password`, {password},{ withCredentials: true });
  }


}
