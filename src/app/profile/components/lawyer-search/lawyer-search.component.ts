import { Component, OnInit } from '@angular/core';
import { LawyerService } from '../../services/lawyer.service';
import { Lawyer } from '../../model/lawyer';

@Component({
  selector: 'app-lawyer-search',
  templateUrl: './lawyer-search.component.html',
  styleUrls: ['./lawyer-search.component.css']
})
export class LawyerSearchComponent implements OnInit {
  lawyers: Lawyer[] = [];
  filteredLawyers: Lawyer[] = [];
  searchName: string = '';
  searchSpecialty: string = '';

  specialties: string[] = [
    'CIVIL', 'CRIMINAL', 'LABOR', 'FAMILY', 'CORPORATE', 'TAX', 'ADMINISTRATIVE',
    'INTELLECTUAL_PROPERTY', 'ENVIRONMENTAL', 'INTERNATIONAL', 'HUMAN_RIGHTS'
  ];

  constructor(private lawyerService: LawyerService) {}

  ngOnInit(): void {
    this.lawyerService.getAllLawyers().subscribe(lawyers => {
      this.lawyers = lawyers;
      this.filteredLawyers = lawyers;
    });
  }

  filterLawyers(): void {
    this.filteredLawyers = this.lawyers.filter(lawyer => {
      const matchesName = lawyer.profile.name.firstName.toLowerCase().includes(this.searchName.toLowerCase()) ||
        lawyer.profile.name.lastName.toLowerCase().includes(this.searchName.toLowerCase());
      const matchesSpecialty = this.searchSpecialty ? lawyer.lawyerTypes.includes(this.searchSpecialty) : true;
      return matchesName && matchesSpecialty;
    });
  }
}
