import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConsultationsLawyerComponent } from './view-consultations-lawyer.component';

describe('ViewConsultationsLawyerComponent', () => {
  let component: ViewConsultationsLawyerComponent;
  let fixture: ComponentFixture<ViewConsultationsLawyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewConsultationsLawyerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewConsultationsLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
