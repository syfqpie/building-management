import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSystemComponent } from './about-system.component';

describe('AboutSystemComponent', () => {
  let component: AboutSystemComponent;
  let fixture: ComponentFixture<AboutSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
