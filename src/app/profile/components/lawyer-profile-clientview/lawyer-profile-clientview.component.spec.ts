import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerProfileClientviewComponent } from './lawyer-profile-clientview.component';

describe('LawyerProfileClientviewComponent', () => {
  let component: LawyerProfileClientviewComponent;
  let fixture: ComponentFixture<LawyerProfileClientviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LawyerProfileClientviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LawyerProfileClientviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
