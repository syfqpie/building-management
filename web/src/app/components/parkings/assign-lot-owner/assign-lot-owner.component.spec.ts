import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLotOwnerComponent } from './assign-lot-owner.component';

describe('AssignLotOwnerComponent', () => {
  let component: AssignLotOwnerComponent;
  let fixture: ComponentFixture<AssignLotOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignLotOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignLotOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
