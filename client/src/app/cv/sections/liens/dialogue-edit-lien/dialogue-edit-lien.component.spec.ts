import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueEditLienComponent } from './dialogue-edit-lien.component';

describe('DialogueEditLienComponent', () => {
  let component: DialogueEditLienComponent;
  let fixture: ComponentFixture<DialogueEditLienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueEditLienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueEditLienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
