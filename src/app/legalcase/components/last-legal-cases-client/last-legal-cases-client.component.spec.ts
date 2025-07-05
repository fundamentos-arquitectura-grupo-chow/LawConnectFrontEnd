import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastLegalCasesClientComponent } from './last-legal-cases-client.component';

describe('LastLegalCasesClientComponent', () => {
  let component: LastLegalCasesClientComponent;
  let fixture: ComponentFixture<LastLegalCasesClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LastLegalCasesClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastLegalCasesClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
