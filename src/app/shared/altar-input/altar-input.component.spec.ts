import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltarInputComponent } from './altar-input.component';

describe('AltarInputComponent', () => {
  let component: AltarInputComponent;
  let fixture: ComponentFixture<AltarInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltarInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltarInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
