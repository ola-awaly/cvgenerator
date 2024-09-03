import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueEditPhotoComponent } from './dialogue-edit-photo.component';

describe('DialogueEditPhotoComponent', () => {
  let component: DialogueEditPhotoComponent;
  let fixture: ComponentFixture<DialogueEditPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueEditPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueEditPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
