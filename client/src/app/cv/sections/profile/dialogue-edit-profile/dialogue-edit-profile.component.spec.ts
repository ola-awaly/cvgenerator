import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueEditProfileComponent } from './dialogue-edit-profile.component';

describe('DialogueEditProfileComponent', () => {
  let component: DialogueEditProfileComponent;
  let fixture: ComponentFixture<DialogueEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueEditProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
