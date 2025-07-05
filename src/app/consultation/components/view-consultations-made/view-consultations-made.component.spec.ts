import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConsultationsMadeComponent } from './view-consultations-made.component';

describe('ViewConsultationsMadeComponent', () => {
  let component: ViewConsultationsMadeComponent;
  let fixture: ComponentFixture<ViewConsultationsMadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewConsultationsMadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewConsultationsMadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
