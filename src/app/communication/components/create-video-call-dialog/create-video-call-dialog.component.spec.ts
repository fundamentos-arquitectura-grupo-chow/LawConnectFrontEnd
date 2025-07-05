import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVideoCallDialogComponent } from './create-video-call-dialog.component';

describe('CreateVideoCallDialogComponent', () => {
  let component: CreateVideoCallDialogComponent;
  let fixture: ComponentFixture<CreateVideoCallDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateVideoCallDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVideoCallDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
