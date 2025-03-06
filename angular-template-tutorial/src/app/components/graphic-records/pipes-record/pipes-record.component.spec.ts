import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipesRecordComponent } from './pipes-record.component';

describe('PipesRecordComponent', () => {
  let component: PipesRecordComponent;
  let fixture: ComponentFixture<PipesRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipesRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipesRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
