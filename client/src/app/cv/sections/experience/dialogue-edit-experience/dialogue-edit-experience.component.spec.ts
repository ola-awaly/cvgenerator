import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueEditExperienceComponent } from './dialogue-edit-experience.component';

describe('DialogueEditExperienceComponent', () => {
  let component: DialogueEditExperienceComponent;
  let fixture: ComponentFixture<DialogueEditExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueEditExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueEditExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
