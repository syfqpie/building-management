import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitNumbersTableComponent } from './unit-numbers-table.component';

describe('UnitNumbersTableComponent', () => {
  let component: UnitNumbersTableComponent;
  let fixture: ComponentFixture<UnitNumbersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitNumbersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitNumbersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
