import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLegalCaseLawyerComponent } from './view-legal-case-lawyer.component';

describe('ViewLegalCaseLawyerComponent', () => {
  let component: ViewLegalCaseLawyerComponent;
  let fixture: ComponentFixture<ViewLegalCaseLawyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewLegalCaseLawyerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLegalCaseLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
