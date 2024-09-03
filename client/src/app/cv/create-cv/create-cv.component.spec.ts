import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCvComponent } from './create-cv.component';

describe('CreateCvComponent', () => {
  let component: CreateCvComponent;
  let fixture: ComponentFixture<CreateCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
