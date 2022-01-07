import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrieComponent } from './industrie.component';

describe('IndustrieComponent', () => {
  let component: IndustrieComponent;
  let fixture: ComponentFixture<IndustrieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustrieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustrieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
