import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgContentRecordComponent } from './ng-content-record.component';

describe('NgContentRecordComponent', () => {
  let component: NgContentRecordComponent;
  let fixture: ComponentFixture<NgContentRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgContentRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgContentRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
