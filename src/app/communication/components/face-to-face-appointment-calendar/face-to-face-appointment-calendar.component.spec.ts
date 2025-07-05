import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceToFaceAppointmentCalendarComponent } from './face-to-face-appointment-calendar.component';

describe('FaceToFaceAppointmentCalendarComponent', () => {
  let component: FaceToFaceAppointmentCalendarComponent;
  let fixture: ComponentFixture<FaceToFaceAppointmentCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaceToFaceAppointmentCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaceToFaceAppointmentCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
