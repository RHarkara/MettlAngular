import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MettlAccountinfoComponent } from './mettl-accountinfo.component';

describe('MettlAccountinfoComponent', () => {
  let component: MettlAccountinfoComponent;
  let fixture: ComponentFixture<MettlAccountinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MettlAccountinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MettlAccountinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
