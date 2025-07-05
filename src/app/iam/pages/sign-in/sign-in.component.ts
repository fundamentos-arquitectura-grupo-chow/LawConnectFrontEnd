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
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private authService: AuthenticationService) {
    this.authService.signOut();
  }

  signIn() {
    this.errorMessage = '';
    this.isLoading = true;

    const signInRequest = new SignInRequest(this.username, this.password);

    // Simplemente llama al servicio sin suscribirse
    this.authService.signIn(signInRequest);

    // Escucha los cambios del estado de autenticación
    this.authService.isSignedIn.subscribe(isSignedIn => {
      this.isLoading = false;
      if (!isSignedIn && this.username && this.password) {
        this.errorMessage = 'Esta cuenta no existe o la contraseña es incorrecta';
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
