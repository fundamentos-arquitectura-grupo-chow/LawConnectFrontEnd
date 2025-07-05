import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-specialization-and-price',
  templateUrl: './add-specialization-and-price.component.html',
  styleUrl: './add-specialization-and-price.component.css'
})
export class AddSpecializationAndPriceComponent {
  constructor(private router: Router) {
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

}
