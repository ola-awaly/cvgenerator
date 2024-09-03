import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueForgetPasswordComponent } from './dialogue-forget-password.component';

describe('DialogueForgetPasswordComponent', () => {
  let component: DialogueForgetPasswordComponent;
  let fixture: ComponentFixture<DialogueForgetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueForgetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
