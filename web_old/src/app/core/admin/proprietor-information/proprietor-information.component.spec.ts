import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietorInformationComponent } from './proprietor-information.component';

describe('ProprietorInformationComponent', () => {
  let component: ProprietorInformationComponent;
  let fixture: ComponentFixture<ProprietorInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProprietorInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProprietorInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
