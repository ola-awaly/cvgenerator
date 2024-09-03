import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueEditSectionComponent } from './dialogue-edit-section.component';

describe('DialogueEditSectionComponent', () => {
  let component: DialogueEditSectionComponent;
  let fixture: ComponentFixture<DialogueEditSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueEditSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueEditSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
