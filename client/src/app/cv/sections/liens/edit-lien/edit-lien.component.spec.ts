import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLienComponent } from './edit-lien.component';

describe('EditLienComponent', () => {
  let component: EditLienComponent;
  let fixture: ComponentFixture<EditLienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
