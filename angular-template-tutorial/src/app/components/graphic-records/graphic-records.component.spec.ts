import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicRecordsComponent } from './graphic-records.component';

describe('GraphicRecordsComponent', () => {
  let component: GraphicRecordsComponent;
  let fixture: ComponentFixture<GraphicRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicRecordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
