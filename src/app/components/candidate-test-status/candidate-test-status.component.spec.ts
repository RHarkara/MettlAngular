import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateTestStatusComponent } from './candidate-test-status.component';

describe('CandidateTestStatusComponent', () => {
  let component: CandidateTestStatusComponent;
  let fixture: ComponentFixture<CandidateTestStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateTestStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateTestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
