import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorsTableComponent } from './floors-table.component';

describe('FloorsTableComponent', () => {
  let component: FloorsTableComponent;
  let fixture: ComponentFixture<FloorsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloorsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
