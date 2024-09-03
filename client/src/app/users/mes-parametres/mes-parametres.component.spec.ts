import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesParametresComponent } from './mes-parametres.component';

describe('MesParametresComponent', () => {
  let component: MesParametresComponent;
  let fixture: ComponentFixture<MesParametresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesParametresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesParametresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
