import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgContainerDemoComponent } from './ng-container-demo.component';

describe('NgContainerDemoComponent', () => {
  let component: NgContainerDemoComponent;
  let fixture: ComponentFixture<NgContainerDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgContainerDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgContainerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
