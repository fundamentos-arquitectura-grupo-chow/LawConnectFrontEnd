import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLegalCaseClientComponent } from './view-legal-case-client.component';

describe('ViewLegalCaseClientComponent', () => {
  let component: ViewLegalCaseClientComponent;
  let fixture: ComponentFixture<ViewLegalCaseClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewLegalCaseClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLegalCaseClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
