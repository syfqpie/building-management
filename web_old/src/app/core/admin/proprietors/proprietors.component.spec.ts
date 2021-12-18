import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietorsComponent } from './proprietors.component';

describe('ProprietorsComponent', () => {
  let component: ProprietorsComponent;
  let fixture: ComponentFixture<ProprietorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProprietorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProprietorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
