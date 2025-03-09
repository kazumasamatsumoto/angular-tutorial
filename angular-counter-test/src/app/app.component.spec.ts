import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { CounterComponent } from './counter/counter.component';
import { DisplayComponent } from './display/display.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, CounterComponent, DisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'Angular Counter Test' title`, () => {
    expect(app.title).toEqual('Angular Counter Test');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Angular Counter Test');
  });

  // 結合テスト: コンポーネント間の連携をテスト
  describe('Counter-Display Integration Tests', () => {
    it('should initialize with count value of 0 in both components', () => {
      // カウンターコンポーネントの初期値を確認
      const counterValueElement = fixture.debugElement.query(By.css('.counter-value'));
      expect(counterValueElement.nativeElement.textContent).toBe('0');

      // 表示コンポーネントの初期値を確認
      const displayValueElement = fixture.debugElement.query(By.css('.count-value'));
      expect(displayValueElement.nativeElement.textContent).toBe('0');
    });

    it('should update display component when counter button is clicked', () => {
      // カウンターボタンを取得
      const incrementButton = fixture.debugElement.query(By.css('.increment-button'));
      
      // ボタンをクリック
      incrementButton.nativeElement.click();
      fixture.detectChanges();
      
      // 表示コンポーネントの値が更新されたことを確認
      const displayValueElement = fixture.debugElement.query(By.css('.count-value'));
      expect(displayValueElement.nativeElement.textContent).toBe('1');
      
      // カウンターコンポーネントの値も更新されていることを確認
      const counterValueElement = fixture.debugElement.query(By.css('.counter-value'));
      expect(counterValueElement.nativeElement.textContent).toBe('1');
    });

    it('should update display component correctly after multiple clicks', () => {
      // カウンターボタンを取得
      const incrementButton = fixture.debugElement.query(By.css('.increment-button'));
      
      // ボタンを3回クリック
      for (let i = 0; i < 3; i++) {
        incrementButton.nativeElement.click();
        fixture.detectChanges();
      }
      
      // 表示コンポーネントの値が3になっていることを確認
      const displayValueElement = fixture.debugElement.query(By.css('.count-value'));
      expect(displayValueElement.nativeElement.textContent).toBe('3');
      
      // カウンターコンポーネントの値も3になっていることを確認
      const counterValueElement = fixture.debugElement.query(By.css('.counter-value'));
      expect(counterValueElement.nativeElement.textContent).toBe('3');
    });

    it('should correctly pass the count value from counter to app to display component', () => {
      // カウンターボタンをクリック
      const incrementButton = fixture.debugElement.query(By.css('.increment-button'));
      incrementButton.nativeElement.click();
      fixture.detectChanges();
      
      // AppComponentのcurrentCount値が1になっていることを確認
      expect(app.currentCount).toBe(1);
      
      // 表示コンポーネントの値も1になっていることを確認
      const displayValueElement = fixture.debugElement.query(By.css('.count-value'));
      expect(displayValueElement.nativeElement.textContent).toBe('1');
    });
  });
});
