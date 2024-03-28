import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../../layout/header/header.component";
import {FooterComponent} from "../../layout/footer/footer.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent,

  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
