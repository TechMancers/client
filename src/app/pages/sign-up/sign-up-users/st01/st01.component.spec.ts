import { ComponentFixture, TestBed } from '@angular/core/testing';

import { St01Component } from './st01.component';

describe('St01Component', () => {
  let component: St01Component;
  let fixture: ComponentFixture<St01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [St01Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(St01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
