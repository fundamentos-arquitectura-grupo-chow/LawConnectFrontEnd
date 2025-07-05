import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRejectionComponent } from './confirm-rejection.component';

describe('ConfirmRejectionComponent', () => {
  let component: ConfirmRejectionComponent;
  let fixture: ComponentFixture<ConfirmRejectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmRejectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmRejectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
