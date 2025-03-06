import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoWayBindingRecordComponent } from './two-way-binding-record.component';

describe('TwoWayBindingRecordComponent', () => {
  let component: TwoWayBindingRecordComponent;
  let fixture: ComponentFixture<TwoWayBindingRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoWayBindingRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoWayBindingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
