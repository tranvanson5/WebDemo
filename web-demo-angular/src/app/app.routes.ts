import { Routes } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";

export const routes: Routes = [
  {
    path: '',
    loadChildren: ()=> import('./user/user.routes').then(r => r.routesUser)
  },
  {
    path:'profile',
    loadChildren: ()=> import('./profile/profile.routes').then(r=>r.routerProfile)
  },
  {
    path:'auth',
    loadChildren: ()=> import('./auth/auth.routes').then(r => r.routes)
  }
];
