import { Routes } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { ProfileInfoComponent } from "./profile-info/profile-info.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";

export const routerProfile: Routes = [
    {
        path: '',
        component: ProfileComponent,
        children: [
          {
            path: '',
            component: ProfileInfoComponent
          },
          {
            path: 'change-password',
            component: ChangePasswordComponent
          }
        ]
    }
];
