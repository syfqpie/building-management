import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysRegisterAdminComponent } from './sys-register-admin.component';

describe('SysRegisterAdminComponent', () => {
  let component: SysRegisterAdminComponent;
  let fixture: ComponentFixture<SysRegisterAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysRegisterAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysRegisterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
