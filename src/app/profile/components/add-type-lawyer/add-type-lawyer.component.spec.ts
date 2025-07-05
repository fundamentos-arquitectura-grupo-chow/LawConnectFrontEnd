import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeLawyerComponent } from './add-type-lawyer.component';

describe('AddTypeLawyerComponent', () => {
  let component: AddTypeLawyerComponent;
  let fixture: ComponentFixture<AddTypeLawyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTypeLawyerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTypeLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
