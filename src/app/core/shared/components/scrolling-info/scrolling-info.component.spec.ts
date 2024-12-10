import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollingInfoComponent } from './scrolling-info.component';

describe('ScrollingInfoComponent', () => {
  let component: ScrollingInfoComponent;
  let fixture: ComponentFixture<ScrollingInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollingInfoComponent]
    });
    fixture = TestBed.createComponent(ScrollingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
