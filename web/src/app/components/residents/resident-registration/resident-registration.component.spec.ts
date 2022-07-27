import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentRegistrationComponent } from './resident-registration.component';

describe('ResidentRegistrationComponent', () => {
  let component: ResidentRegistrationComponent;
  let fixture: ComponentFixture<ResidentRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
