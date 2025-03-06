import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionSyntaxComponent } from './expression-syntax.component';

describe('ExpressionSyntaxComponent', () => {
  let component: ExpressionSyntaxComponent;
  let fixture: ComponentFixture<ExpressionSyntaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpressionSyntaxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpressionSyntaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
