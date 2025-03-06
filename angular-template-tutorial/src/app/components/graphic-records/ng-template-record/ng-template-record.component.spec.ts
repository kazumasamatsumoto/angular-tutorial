import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTemplateRecordComponent } from './ng-template-record.component';

describe('NgTemplateRecordComponent', () => {
  let component: NgTemplateRecordComponent;
  let fixture: ComponentFixture<NgTemplateRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgTemplateRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgTemplateRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
