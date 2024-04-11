import { Routes } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {AuthorizationGuard} from "./auth/service/auth/authorization.guard";

export const routes: Routes = [
  {
    path: '',
    loadChildren: ()=> import('./user/user.routes').then(r => r.routesUser)
  },
  {
    path:'profile',
    loadChildren: ()=> import('./profile/profile.routes').then(r=>r.routerProfile),
    canActivate: [AuthorizationGuard], data: { roles: ['ROLE_ADMIN',"ROLE_PM","ROLE_USER"] }
  },
  {
    path:'auth',
    loadChildren: ()=> import('./auth/auth.routes').then(r => r.routes),

  },

];
