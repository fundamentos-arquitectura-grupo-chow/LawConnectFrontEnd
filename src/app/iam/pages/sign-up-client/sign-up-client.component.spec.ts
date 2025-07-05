import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpClientComponent } from './sign-up-client.component';

describe('SignUpClientComponent', () => {
  let component: SignUpClientComponent;
  let fixture: ComponentFixture<SignUpClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
