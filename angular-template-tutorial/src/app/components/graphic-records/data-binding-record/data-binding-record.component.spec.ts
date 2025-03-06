import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBindingRecordComponent } from './data-binding-record.component';

describe('DataBindingRecordComponent', () => {
  let component: DataBindingRecordComponent;
  let fixture: ComponentFixture<DataBindingRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataBindingRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataBindingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
