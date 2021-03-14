import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementAuditTrailsComponent } from './management-audit-trails.component';

describe('ManagementAuditTrailsComponent', () => {
  let component: ManagementAuditTrailsComponent;
  let fixture: ComponentFixture<ManagementAuditTrailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementAuditTrailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementAuditTrailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
