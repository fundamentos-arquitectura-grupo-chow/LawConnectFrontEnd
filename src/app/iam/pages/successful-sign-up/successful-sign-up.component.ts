import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-successful-sign-up',
  templateUrl: './successful-sign-up.component.html',
  styleUrl: './successful-sign-up.component.css'
})
export class SuccessfulSignUpComponent {

  constructor(private router: Router) {
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

}
