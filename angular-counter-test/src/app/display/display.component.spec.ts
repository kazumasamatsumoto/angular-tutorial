import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DisplayComponent } from './display.component';

describe('DisplayComponent', () => {
  let component: DisplayComponent;
  let fixture: ComponentFixture<DisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // 単体テスト: 表示コンポーネントの機能テスト
  describe('表示コンポーネントの機能テスト', () => {
    it('初期値は0であること', () => {
      expect(component.countValue).toBe(0);
    });

    it('countValueプロパティが変更されると表示も更新されること', () => {
      // 初期値を確認
      let valueElement = fixture.debugElement.query(By.css('.count-value'));
      expect(valueElement.nativeElement.textContent).toBe('0');
      
      // countValueを変更
      component.countValue = 5;
      fixture.detectChanges();
      
      // 表示が更新されたことを確認
      valueElement = fixture.debugElement.query(By.css('.count-value'));
      expect(valueElement.nativeElement.textContent).toBe('5');
    });
  });

  // UIテスト: 表示コンポーネントのUIテスト
  describe('表示コンポーネントのUIテスト', () => {
    it('タイトルが表示されていること', () => {
      const titleElement = fixture.debugElement.query(By.css('h2'));
      expect(titleElement.nativeElement.textContent).toBe('表示コンポーネント');
    });

    it('カウンター値の説明テキストが表示されていること', () => {
      const textElement = fixture.debugElement.query(By.css('.display-value p'));
      expect(textElement.nativeElement.textContent).toContain('カウンターの現在値:');
    });

    it('スタイルが適切に適用されていること', () => {
      const containerElement = fixture.debugElement.query(By.css('.display-container'));
      const valueElement = fixture.debugElement.query(By.css('.count-value'));
      
      expect(containerElement).toBeTruthy();
      expect(valueElement).toBeTruthy();
      
      const computedStyle = window.getComputedStyle(valueElement.nativeElement);
      // 'bold'は'700'として解釈されることがあるため、どちらでも通るようにする
      expect(['bold', '700']).toContain(computedStyle.fontWeight);
    });
  });
});
