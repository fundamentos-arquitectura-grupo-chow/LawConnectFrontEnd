import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  constructor(private router: Router) {
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

}
