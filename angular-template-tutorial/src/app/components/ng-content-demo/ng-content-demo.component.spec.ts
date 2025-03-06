import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgContentDemoComponent } from './ng-content-demo.component';

describe('NgContentDemoComponent', () => {
  let component: NgContentDemoComponent;
  let fixture: ComponentFixture<NgContentDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgContentDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgContentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
