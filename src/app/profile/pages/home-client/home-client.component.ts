import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../iam/services/authentication.service";

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrl: './home-client.component.css'
})
export class HomeClientComponent implements OnInit {
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
