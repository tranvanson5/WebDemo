import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user.component';

export const routesUser: Routes = [
  {
    path:'',
    component: UserComponent,
    children: [
      {
        path:'',
        component: HomeComponent
      },
      {
        path:'product',
        component: ProductComponent
      }
    ]
  },

];
