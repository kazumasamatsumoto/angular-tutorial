import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitespaceHandlingComponent } from './whitespace-handling.component';

describe('WhitespaceHandlingComponent', () => {
  let component: WhitespaceHandlingComponent;
  let fixture: ComponentFixture<WhitespaceHandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhitespaceHandlingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhitespaceHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
