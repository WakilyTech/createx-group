import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentestandardComponent } from './ventestandard.component';

describe('BlogdetailsComponent', () => {
  let component: VentestandardComponent;
  let fixture: ComponentFixture<VentestandardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentestandardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentestandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
