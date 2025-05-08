import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecializationAndPriceComponent } from './add-specialization-and-price.component';

describe('AddSpecializationAndPriceComponent', () => {
  let component: AddSpecializationAndPriceComponent;
  let fixture: ComponentFixture<AddSpecializationAndPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSpecializationAndPriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSpecializationAndPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
