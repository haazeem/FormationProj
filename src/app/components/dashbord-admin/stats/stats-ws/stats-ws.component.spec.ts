import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsWsComponent } from './stats-ws.component';

describe('StatsWsComponent', () => {
  let component: StatsWsComponent;
  let fixture: ComponentFixture<StatsWsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsWsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
