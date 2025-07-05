import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewLegalCaseComponent } from './review-legal-case.component';

describe('ReviewLegalCaseComponent', () => {
  let component: ReviewLegalCaseComponent;
  let fixture: ComponentFixture<ReviewLegalCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewLegalCaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewLegalCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
