import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierMotDePasseComponent } from './modifier-mot-de-passe.component';

describe('ModifierMotDePasseComponent', () => {
  let component: ModifierMotDePasseComponent;
  let fixture: ComponentFixture<ModifierMotDePasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierMotDePasseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierMotDePasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
