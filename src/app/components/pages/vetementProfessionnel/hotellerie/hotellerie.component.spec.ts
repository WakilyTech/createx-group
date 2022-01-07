import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotellerieComponent } from './hotellerie.component';

describe('HotellerieComponent', () => {
  let component: HotellerieComponent;
  let fixture: ComponentFixture<HotellerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotellerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotellerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
