import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsAddComponent } from './units-add.component';

describe('UnitsAddComponent', () => {
  let component: UnitsAddComponent;
  let fixture: ComponentFixture<UnitsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
