import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import { AuthStoreService } from './service/store/auth-store.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent  implements OnInit{
  constructor(private authStoreService:AuthStoreService){

  }
  ngOnInit(): void {
    this.authStoreService.logout();
    // throw new Error('Method not implemented.');
  }
}
