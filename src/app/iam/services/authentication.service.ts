import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { SignUpRequest } from '../model/sign-up.request';
import { SignUpResponse } from '../model/sign-up.response';
import { SignInRequest } from '../model/sign-in.request';
import { SignInResponse } from '../model/sign-in.response';
import { LawyerService } from '../../profile/services/lawyer.service';
import { ClientService } from '../../profile/services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { CompleteSignUpLawyerComponent } from '../../profile/components/complete-sign-up-lawyer/complete-sign-up-lawyer.component';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  basePath: string = `${environment.serverBasePath}`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  private signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasValidToken());
  private signedInUserId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private signedInUsername: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private signedInUserRole: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private router: Router,
    private http: HttpClient,
    private lawyerService: LawyerService,
    private clientService: ClientService,
    private dialog: MatDialog
  ) {
    this.initializeAuthState();
  }

  private hasValidToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  private initializeAuthState(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.signedIn.next(true);

      const username = localStorage.getItem('username');
      const role = localStorage.getItem('role');
      const userId = localStorage.getItem('userId');

      if (username) this.signedInUsername.next(username);
      if (role) this.signedInUserRole.next(role);
      if (userId) this.signedInUserId.next(Number(userId));
    }
  }

  get isSignedIn() {
    return this.signedIn.asObservable();
  }

  get currentUserId() {
    return this.signedInUserId.asObservable();
  }

  get currentUsername() {
    return this.signedInUsername.asObservable();
  }

  get currentUserRole() {
    return this.signedInUserRole.asObservable();
  }

  signUp(signUpRequest: SignUpRequest) {
    this.http
      .post<SignUpResponse>(
        `${this.basePath}/authentication/sign-up`,
        signUpRequest,
        this.httpOptions
      )
      .subscribe({
        next: (response) => {
          console.log(`Signed with id ${response.id}`);
          this.router.navigate(['/sign-in']).then();
        },
        error: (error) => {
          console.error(`Error while signing up: ${error}`);
          this.router.navigate(['/sign-up']);
        },
      });
  }

  signIn(signInRequest: SignInRequest) {
    this.http.post<SignInResponse>(`${this.basePath}/authentication/sign-in`, signInRequest, this.httpOptions)
      .subscribe({
        next: (response) => {
          this.signedIn.next(true);
          this.signedInUsername.next(response.username);
          this.signedInUserRole.next(response.role);

          // Guardar en localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
          localStorage.setItem('role', response.role);

          console.log(`Signed in as ${response.username} with token ${response.token}`);
          console.log(`Role: ${response.role}`);

          if (response.role === '[Role(id=1, name=LAWYER)]') {
            this.lawyerService.getLawyerIdByEmail(response.username).subscribe(lawyerId => {
              this.signedInUserId.next(lawyerId);
              localStorage.setItem('userId', lawyerId.toString());
              this.router.navigate(['/home-lawyer']).then(() => {
                this.lawyerService.getLawyerById(lawyerId).subscribe(lawyer => {
                  if (lawyer.lawyerTypes.length == 0) {
                    this.dialog.open(CompleteSignUpLawyerComponent, {
                      width: '400px',
                      data: { lawyerId }
                    });
                  }
                });
              });
            });
          } else {
            this.clientService.getClientIdByEmail(response.username).subscribe(clientId => {
              this.signedInUserId.next(clientId);
              localStorage.setItem('userId', clientId.toString());
              this.router.navigate(['/home-client']).then();
            });
          }
        },
        error: (error) => {
          console.error(`Error while signing in: ${error}`);
          this.signedIn.next(false);
          this.signedInUserId.next(0);
          this.signedInUsername.next('');
          this.signedInUserRole.next('');
          localStorage.clear();
          this.router.navigate(['/sign-in']).then();
        }
      });
  }

  signOut() {
    this.signedIn.next(false);
    this.signedInUserId.next(0);
    this.signedInUsername.next('');
    this.signedInUserRole.next('');

    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');

    this.router.navigate(['/sign-in']);
  }
}
