import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpLawyerComponent } from './sign-up-lawyer.component';

describe('SignUpLawyerComponent', () => {
  let component: SignUpLawyerComponent;
  let fixture: ComponentFixture<SignUpLawyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpLawyerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
