import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterDetailComponent } from './renter-detail.component';

describe('RenterDetailComponent', () => {
  let component: RenterDetailComponent;
  let fixture: ComponentFixture<RenterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenterDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
