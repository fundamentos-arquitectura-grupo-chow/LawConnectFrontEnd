import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { SignInRequest } from '../../model/sign-in.request';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  username: string = '';
  password: string = '';
  userRole: string = '';

  constructor(private router: Router, private authService: AuthenticationService) {
    this.authService.signOut();
  }

  signIn() {
    const signInRequest = new SignInRequest(this.username, this.password);
    this.authService.signIn(signInRequest);
  }

  navigateSignIn() {
    this.authService.currentUserRole.subscribe((role) => {
      const match = role.match(/name=(\w+)/);
      if (match) {
        this.userRole = match[1];
      }
    });
    console.log('User role:', this.userRole);
    if (this.userRole === 'CLIENT') {
      this.navigateTo('home-client');
    } else if (this.userRole === 'LAWYER') {
      this.navigateTo('home-lawyer');
    }
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
