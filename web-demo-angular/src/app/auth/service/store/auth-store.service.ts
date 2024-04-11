import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  private authSubject = new BehaviorSubject<any>(null);
  auth$ = this.authSubject.asObservable();

  constructor() {
    this.loadAuthData();
  }

  private loadAuthData() {
    const authData = localStorage.getItem('auth');
    if (authData) {
      this.authSubject.next(JSON.parse(authData));
    }
  }

  getAuthLogin() {
    return this.authSubject.getValue();
  }

  setAuthLogin(auth: any) {
    localStorage.setItem('auth', JSON.stringify(auth));
    this.authSubject.next(auth);
  }

  logout() {
    localStorage.clear();
    this.authSubject.next(null);
  }
}
