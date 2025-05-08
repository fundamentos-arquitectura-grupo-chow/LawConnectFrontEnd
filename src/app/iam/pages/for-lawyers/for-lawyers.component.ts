import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-for-lawyers',
  templateUrl: './for-lawyers.component.html',
  styleUrl: './for-lawyers.component.css'
})
export class ForLawyersComponent {

  constructor(private router: Router) {
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
