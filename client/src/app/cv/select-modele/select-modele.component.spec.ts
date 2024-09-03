import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectModeleComponent } from './select-modele.component';

describe('SelectModeleComponent', () => {
  let component: SelectModeleComponent;
  let fixture: ComponentFixture<SelectModeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectModeleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
