import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueEditFormationComponent } from './dialogue-edit-formation.component';

describe('DialogueEditFormationComponent', () => {
  let component: DialogueEditFormationComponent;
  let fixture: ComponentFixture<DialogueEditFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueEditFormationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueEditFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
