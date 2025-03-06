import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventBindingRecordComponent } from './event-binding-record.component';

describe('EventBindingRecordComponent', () => {
  let component: EventBindingRecordComponent;
  let fixture: ComponentFixture<EventBindingRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventBindingRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventBindingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
