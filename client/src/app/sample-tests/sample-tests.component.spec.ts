import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleTestsComponent } from './sample-tests.component';

describe('SampleTestsComponent', () => {
  let component: SampleTestsComponent;
  let fixture: ComponentFixture<SampleTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleTestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
