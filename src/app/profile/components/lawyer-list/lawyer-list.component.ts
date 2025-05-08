import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lawyer } from '../../model/lawyer';
import { LawyerService } from '../../services/lawyer.service';

@Component({
  selector: 'app-lawyer-list',
  templateUrl: './lawyer-list.component.html',
  styleUrls: ['./lawyer-list.component.css']
})
export class LawyerListComponent implements OnInit {
  lawyers: Lawyer[] = [];
  randomLawyers: Lawyer[] = [];
  currentIndex: number = 0;

  constructor(private lawyerService: LawyerService, private router: Router) {}

  ngOnInit(): void {
    this.lawyerService.getAllLawyers().subscribe((lawyers: Lawyer[]) => {
      this.lawyers = lawyers;
      this.randomLawyers = this.getRandomLawyers(3);
    });
  }

  getRandomLawyers(count: number): Lawyer[] {
    const shuffled = this.lawyers.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  nextLawyer(): void {
    if (this.currentIndex < this.randomLawyers.length - 1) {
      this.currentIndex++;
    }
  }

  prevLawyer(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  viewProfile(lawyerId: number): void {
    this.router.navigate([`/lawyer-profile/${lawyerId}`]);
  }

  get currentLawyer(): Lawyer {
    return this.randomLawyers[this.currentIndex];
  }
}
