import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForLawyersComponent } from './for-lawyers.component';

describe('ForLawyersComponent', () => {
  let component: ForLawyersComponent;
  let fixture: ComponentFixture<ForLawyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForLawyersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForLawyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
