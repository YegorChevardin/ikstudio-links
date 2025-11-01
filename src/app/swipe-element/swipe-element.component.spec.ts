import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeElementComponent } from './swipe-element.component';

describe('SwipeElementComponent', () => {
  let component: SwipeElementComponent;
  let fixture: ComponentFixture<SwipeElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwipeElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwipeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
