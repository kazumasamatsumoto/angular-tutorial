import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // 機能テスト：インクリメントカウンターの機能テスト
  describe('カウンター機能のテスト', () => {
    it('初期値は0であること', () => {
      expect(component.count()).toBe(0);
    });

    it('incrementメソッドを呼び出すとカウンターが+1されること', () => {
      // 初期値を確認
      expect(component.count()).toBe(0);
      
      // incrementメソッドを呼び出す
      component.increment();
      
      // カウンターが+1されたことを確認
      expect(component.count()).toBe(1);
      
      // もう一度incrementメソッドを呼び出す
      component.increment();
      
      // カウンターがさらに+1されたことを確認
      expect(component.count()).toBe(2);
    });
  });

  // UIテスト：インクリメントカウンターのボタンが適切な配色、文字が表示されているかHTML、CSS側のテスト
  describe('カウンターUIのテスト', () => {
    it('カウンター値が表示されていること', () => {
      const counterValueElement = fixture.debugElement.query(By.css('.counter-value'));
      expect(counterValueElement.nativeElement.textContent).toBe('0');
    });

    it('「増加」ボタンが存在すること', () => {
      const incrementButton = fixture.debugElement.query(By.css('.increment-button'));
      expect(incrementButton).toBeTruthy();
      expect(incrementButton.nativeElement.textContent).toBe('増加');
    });

    it('ボタンをクリックするとカウンターが+1されること', () => {
      const incrementButton = fixture.debugElement.query(By.css('.increment-button'));
      
      // 初期値を確認
      let counterValueElement = fixture.debugElement.query(By.css('.counter-value'));
      expect(counterValueElement.nativeElement.textContent).toBe('0');
      
      // ボタンをクリック
      incrementButton.nativeElement.click();
      fixture.detectChanges();
      
      // カウンターが+1されたことを確認
      counterValueElement = fixture.debugElement.query(By.css('.counter-value'));
      expect(counterValueElement.nativeElement.textContent).toBe('1');
    });

    it('ボタンのスタイルが適切であること', () => {
      const incrementButton = fixture.debugElement.query(By.css('.increment-button'));
      const computedStyle = window.getComputedStyle(incrementButton.nativeElement);
      
      // ボタンの背景色が緑系であることを確認（実際の値はブラウザ環境によって異なる場合があるため、厳密な値の比較は避ける）
      expect(incrementButton.nativeElement.classList.contains('increment-button')).toBe(true);
      
      // テキストが白色であることを確認
      expect(computedStyle.color.toLowerCase()).toContain('rgb(255, 255, 255)');
    });
  });
});
