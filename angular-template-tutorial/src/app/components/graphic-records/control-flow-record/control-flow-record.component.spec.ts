import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlFlowRecordComponent } from './control-flow-record.component';

describe('ControlFlowRecordComponent', () => {
  let component: ControlFlowRecordComponent;
  let fixture: ComponentFixture<ControlFlowRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlFlowRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlFlowRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
