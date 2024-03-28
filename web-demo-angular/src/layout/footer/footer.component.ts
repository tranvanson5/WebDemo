import { Component } from '@angular/core';
import {MatChipTrailingIcon} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatChipTrailingIcon,
    MatIconModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
