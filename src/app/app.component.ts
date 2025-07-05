import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LawConnect';
  options = [
    { path: '/home', title: 'Home'},
  ]
  constructor(private router: Router)
  {
  }
  shouldShowToolbar(){
    return !(this.router.url == '/sign-up' || this.router.url == '/sign-in'
      || this.router.url == '/choose-role' || this.router.url == '/successful'
      || this.router.url == '/sign-up-lawyer' || this.router.url == '/sign-up-client'
      || this.router.url == '/forgot-password' || this.router.url == '/for-lawyers'
      || this.router.url == '/add-specialization-and-price');
  }
  shouldShowFooter(){
    return this.router.url !== '/sign-up' && this.router.url !== '/sign-in';
  }

}
