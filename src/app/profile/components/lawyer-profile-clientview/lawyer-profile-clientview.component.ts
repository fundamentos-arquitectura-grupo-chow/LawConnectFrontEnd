import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LawyerService } from '../../services/lawyer.service';
import { Lawyer } from '../../model/lawyer';

@Component({
  selector: 'app-lawyer-profile-clientview',
  templateUrl: './lawyer-profile-clientview.component.html',
  styleUrls: ['./lawyer-profile-clientview.component.css']
})
export class LawyerProfileClientviewComponent implements OnInit {
  lawyer: Lawyer | null = null;

  constructor(private route: ActivatedRoute, private lawyerService: LawyerService) {}

  ngOnInit(): void {
    const lawyerId = this.route.snapshot.params['lawyerId'];
    console.log('Lawyer ID:', lawyerId);
    this.lawyerService.getLawyerById(lawyerId).subscribe((lawyer: Lawyer) => {
      this.lawyer = lawyer;
    });
  }
}
