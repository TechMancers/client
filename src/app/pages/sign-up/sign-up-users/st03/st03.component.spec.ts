import { ComponentFixture, TestBed } from '@angular/core/testing';

import { St03Component } from './st03.component';

describe('St03Component', () => {
  let component: St03Component;
  let fixture: ComponentFixture<St03Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [St03Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(St03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
