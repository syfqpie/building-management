import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationFloorsComponent } from './configuration-floors.component';

describe('ConfigurationFloorsComponent', () => {
  let component: ConfigurationFloorsComponent;
  let fixture: ComponentFixture<ConfigurationFloorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationFloorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationFloorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
