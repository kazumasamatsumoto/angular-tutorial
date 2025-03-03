import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalRxjsDemoComponent } from './signal-rxjs-demo.component';

describe('SignalRxjsDemoComponent', () => {
  let component: SignalRxjsDemoComponent;
  let fixture: ComponentFixture<SignalRxjsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalRxjsDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalRxjsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
