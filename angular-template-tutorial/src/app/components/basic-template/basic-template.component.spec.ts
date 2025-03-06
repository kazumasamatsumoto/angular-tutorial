import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTemplateComponent } from './basic-template.component';

describe('BasicTemplateComponent', () => {
  let component: BasicTemplateComponent;
  let fixture: ComponentFixture<BasicTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
