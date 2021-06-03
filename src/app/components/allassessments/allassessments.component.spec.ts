import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllassessmentsComponent } from './allassessments.component';

describe('AllassessmentsComponent', () => {
  let component: AllassessmentsComponent;
  let fixture: ComponentFixture<AllassessmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllassessmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllassessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
