import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCloseCaseComponent } from './confirm-close-case.component';

describe('ConfirmCloseCaseComponent', () => {
  let component: ConfirmCloseCaseComponent;
  let fixture: ComponentFixture<ConfirmCloseCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmCloseCaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCloseCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
