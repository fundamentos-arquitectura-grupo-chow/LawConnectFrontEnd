import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { SignUpRequest } from '../../model/sign-up.request';

@Component({
  selector: 'app-sign-up-lawyer',
  templateUrl: './sign-up-lawyer.component.html',
  styleUrl: './sign-up-lawyer.component.css'
})
export class SignUpLawyerComponent {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  address: string = '';
  dni: string = '';
  imageUrl: string = 'https://st2.depositphotos.com/19428878/44645/v/450/depositphotos_446453832-stock-illustration-default-avatar-profile-icon-social.jpg';

  constructor(private router: Router, private authService: AuthenticationService) {}

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  signUp() {
    const signUpRequest = new SignUpRequest(
      this.email,
      this.password,
      ['LAWYER'],
      this.firstName,
      this.lastName,
      this.phoneNumber,
      this.address,
      this.dni,
      this.imageUrl
    );
    this.authService.signUp(signUpRequest);
  }
}
