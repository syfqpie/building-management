import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationBlocksComponent } from './configuration-blocks.component';

describe('ConfigurationBlocksComponent', () => {
  let component: ConfigurationBlocksComponent;
  let fixture: ComponentFixture<ConfigurationBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationBlocksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
