import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCvComponent } from './liste-cv.component';

describe('ListeCvComponent', () => {
  let component: ListeCvComponent;
  let fixture: ComponentFixture<ListeCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
