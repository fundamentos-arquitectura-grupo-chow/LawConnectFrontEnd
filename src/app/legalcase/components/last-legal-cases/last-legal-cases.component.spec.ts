import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastLegalCasesComponent } from './last-legal-cases.component';

describe('LastLegalCasesComponent', () => {
  let component: LastLegalCasesComponent;
  let fixture: ComponentFixture<LastLegalCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LastLegalCasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastLegalCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
