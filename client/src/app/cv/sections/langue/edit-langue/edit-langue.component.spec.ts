import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLangueComponent } from './edit-langue.component';

describe('EditLangueComponent', () => {
  let component: EditLangueComponent;
  let fixture: ComponentFixture<EditLangueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLangueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLangueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
