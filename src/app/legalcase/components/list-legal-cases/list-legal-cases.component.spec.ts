import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLegalCasesComponent } from './list-legal-cases.component';

describe('ListLegalCasesComponent', () => {
  let component: ListLegalCasesComponent;
  let fixture: ComponentFixture<ListLegalCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListLegalCasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLegalCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
