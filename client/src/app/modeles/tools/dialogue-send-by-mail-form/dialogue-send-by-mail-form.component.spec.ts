import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueSendByMailFormComponent } from './dialogue-send-by-mail-form.component';

describe('DialogueSendByMailFormComponent', () => {
  let component: DialogueSendByMailFormComponent;
  let fixture: ComponentFixture<DialogueSendByMailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueSendByMailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueSendByMailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
