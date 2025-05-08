import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteSignUpLawyerComponent } from './complete-sign-up-lawyer.component';

describe('CompleteSignUpLawyerComponent', () => {
  let component: CompleteSignUpLawyerComponent;
  let fixture: ComponentFixture<CompleteSignUpLawyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteSignUpLawyerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteSignUpLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
