import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueRenameCvlabelComponent } from './dialogue-rename-cvlabel.component';

describe('DialogueRenameCvlabelComponent', () => {
  let component: DialogueRenameCvlabelComponent;
  let fixture: ComponentFixture<DialogueRenameCvlabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueRenameCvlabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueRenameCvlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
