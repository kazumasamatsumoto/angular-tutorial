import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgContainerRecordComponent } from './ng-container-record.component';

describe('NgContainerRecordComponent', () => {
  let component: NgContainerRecordComponent;
  let fixture: ComponentFixture<NgContainerRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgContainerRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgContainerRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
