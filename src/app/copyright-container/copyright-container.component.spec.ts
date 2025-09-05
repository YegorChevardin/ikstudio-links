import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyrightContainerComponent } from './copyright-container.component';

describe('CopyrightContainerComponent', () => {
  let component: CopyrightContainerComponent;
  let fixture: ComponentFixture<CopyrightContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyrightContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopyrightContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
