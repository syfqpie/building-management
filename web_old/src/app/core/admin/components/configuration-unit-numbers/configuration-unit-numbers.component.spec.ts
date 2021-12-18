import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationUnitNumbersComponent } from './configuration-unit-numbers.component';

describe('ConfigurationUnitNumbersComponent', () => {
  let component: ConfigurationUnitNumbersComponent;
  let fixture: ComponentFixture<ConfigurationUnitNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationUnitNumbersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationUnitNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
