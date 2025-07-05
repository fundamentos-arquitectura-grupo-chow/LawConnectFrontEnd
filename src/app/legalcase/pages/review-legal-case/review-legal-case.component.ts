import {Component, OnInit} from '@angular/core';
import {LegalCaseService} from "../../services/legal-case.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmRejectionComponent} from "../../components/confirm-rejection/confirm-rejection.component";
import {LegalCase} from "../../model/legal-case";

@Component({
  selector: 'app-review-legal-case',
  templateUrl: './review-legal-case.component.html',
  styleUrl: './review-legal-case.component.css'
})
export class ReviewLegalCaseComponent implements OnInit {
  legalCase: LegalCase | null = null;
  showPopup = false;

  constructor(private legalCaseService: LegalCaseService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    const legalCaseId = 1;
    this.legalCaseService.getLegalCaseById(legalCaseId).subscribe((data) => {
      this.legalCase = data;
    });
  }

  openRejectionPopup(action: 'reject') {
    const dialogRef = this.dialog.open(ConfirmRejectionComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'reject') {
        this.showPopup = true;
      }
    });
  }

  onRejectCase(confirmed: boolean) {
    this.showPopup = false;
    if (confirmed) {
      this.router.navigate(['/notifications']);
    }
  }

  seeProfile() {
    this.router.navigate(['/client-profile']);
  }

  acceptCase() {
    // this.router.navigate([`/legal-case/${this.legalCase.id}`]);
    this.router.navigate(['/view-legal-case']);

  }
}
