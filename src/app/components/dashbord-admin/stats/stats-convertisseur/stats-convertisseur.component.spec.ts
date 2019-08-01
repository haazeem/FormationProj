import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsConvertisseurComponent } from './stats-convertisseur.component';

describe('StatsConvertisseurComponent', () => {
  let component: StatsConvertisseurComponent;
  let fixture: ComponentFixture<StatsConvertisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsConvertisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsConvertisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
