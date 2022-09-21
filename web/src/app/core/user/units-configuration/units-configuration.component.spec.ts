import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsConfigurationComponent } from './units-configuration.component';

describe('UnitsConfigurationComponent', () => {
  let component: UnitsConfigurationComponent;
  let fixture: ComponentFixture<UnitsConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitsConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
