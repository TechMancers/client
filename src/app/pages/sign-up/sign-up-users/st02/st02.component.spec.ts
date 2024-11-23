import { ComponentFixture, TestBed } from '@angular/core/testing';

import { St02Component } from './st02.component';

describe('St02Component', () => {
  let component: St02Component;
  let fixture: ComponentFixture<St02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [St02Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(St02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
