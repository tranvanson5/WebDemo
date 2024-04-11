import {Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import { AuthComponent } from "./auth.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ChangePasswordComponent} from "./forgot-password/change-password/change-password.component";

export const routes: Routes = [
  {
    path:'',
    component: AuthComponent,
    children:[
      {
        path:'login',
        component: LoginComponent
      },
      {
        path:'register',
        component: RegisterComponent
      },
      {
        path:'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path:'forgot-password/change-password',
        component: ChangePasswordComponent
      }
    ]
  },
];
