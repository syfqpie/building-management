import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignResidentComponent } from './assign-resident.component';

describe('AssignResidentComponent', () => {
  let component: AssignResidentComponent;
  let fixture: ComponentFixture<AssignResidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignResidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignResidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
