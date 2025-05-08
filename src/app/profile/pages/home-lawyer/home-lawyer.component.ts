import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../iam/services/authentication.service";

@Component({
  selector: 'app-home-lawyer',
  templateUrl: './home-lawyer.component.html',
  styleUrl: './home-lawyer.component.css'
})
export class HomeLawyerComponent  implements OnInit {
  currentId: number = 0;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authService.currentUserId.subscribe(
      (id) => {
        this.currentId = id;
      }
    );
  }

}
