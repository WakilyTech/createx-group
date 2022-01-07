import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailbienComponent } from './detailbien.component';

describe('LocationComponent', () => {
  let component: DetailbienComponent;
  let fixture: ComponentFixture<DetailbienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailbienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailbienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
