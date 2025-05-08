import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeConsultationComponent } from './make-consultation.component';

describe('MakeConsultationComponent', () => {
  let component: MakeConsultationComponent;
  let fixture: ComponentFixture<MakeConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakeConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
