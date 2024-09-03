import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueEditLangueComponent } from './dialogue-edit-langue.component';

describe('DialogueEditLangueComponent', () => {
  let component: DialogueEditLangueComponent;
  let fixture: ComponentFixture<DialogueEditLangueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueEditLangueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueEditLangueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
