import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationstandardComponent } from './locationstandard.component';

describe('BlogstandardComponent', () => {
  let component: LocationstandardComponent;
  let fixture: ComponentFixture<LocationstandardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationstandardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationstandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
