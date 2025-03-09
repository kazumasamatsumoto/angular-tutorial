# Angular Counter Test

このプロジェクトは、Angular v19 を使用したカウンターアプリケーションで、Jasmine と karma を使用したテスト実装のデモンストレーションです。

## プロジェクト概要

このアプリケーションは、シンプルなカウンター機能を提供します：

- 初期値は 0 と表示されています
- 「増加」ボタンをクリックすると、カウンターの値が+1 されます
- 状態管理には Angular Signals を使用しています

## コンポーネント構造

### カウンターコンポーネント

カウンターコンポーネントは、以下の要素で構成されています：

- カウンター値の表示部分
- 「増加」ボタン

## Signals を使用した状態管理

このプロジェクトでは、Angular v19 の新機能である Signals を使用して状態管理を実装しています。

```typescript
// カウンターの状態をSignalで管理
count = signal(0);

// カウンターをインクリメントするメソッド
increment() {
  this.count.update(value => value + 1);
}
```

Signals は、リアクティブな状態管理を簡潔に実装できる機能で、以下の利点があります：

- 明示的な変更検知
- 型安全性
- パフォーマンスの向上
- テストのしやすさ

## テスト実装

このプロジェクトでは、2 種類のテストを実装しています：

### 1. 機能テスト

カウンターの機能をテストします：

- 初期値が 0 であることを確認
- increment メソッドを呼び出すとカウンターが+1 されることを確認

```typescript
// 機能テスト：インクリメントカウンターの機能テスト
describe("カウンター機能のテスト", () => {
  it("初期値は0であること", () => {
    expect(component.count()).toBe(0);
  });

  it("incrementメソッドを呼び出すとカウンターが+1されること", () => {
    // 初期値を確認
    expect(component.count()).toBe(0);

    // incrementメソッドを呼び出す
    component.increment();

    // カウンターが+1されたことを確認
    expect(component.count()).toBe(1);
  });
});
```

### 2. UI テスト

カウンターの UI をテストします：

- カウンター値が表示されていることを確認
- 「増加」ボタンが存在し、適切なテキストが表示されていることを確認
- ボタンをクリックするとカウンターが+1 されることを確認
- ボタンのスタイル（背景色、テキスト色）が適切であることを確認

```typescript
// UIテスト：インクリメントカウンターのボタンが適切な配色、文字が表示されているかHTML、CSS側のテスト
describe("カウンターUIのテスト", () => {
  it("カウンター値が表示されていること", () => {
    const counterValueElement = fixture.debugElement.query(By.css(".counter-value"));
    expect(counterValueElement.nativeElement.textContent).toBe("0");
  });

  it("「増加」ボタンが存在すること", () => {
    const incrementButton = fixture.debugElement.query(By.css(".increment-button"));
    expect(incrementButton).toBeTruthy();
    expect(incrementButton.nativeElement.textContent).toBe("増加");
  });

  it("ボタンをクリックするとカウンターが+1されること", () => {
    const incrementButton = fixture.debugElement.query(By.css(".increment-button"));

    // 初期値を確認
    let counterValueElement = fixture.debugElement.query(By.css(".counter-value"));
    expect(counterValueElement.nativeElement.textContent).toBe("0");

    // ボタンをクリック
    incrementButton.nativeElement.click();
    fixture.detectChanges();

    // カウンターが+1されたことを確認
    counterValueElement = fixture.debugElement.query(By.css(".counter-value"));
    expect(counterValueElement.nativeElement.textContent).toBe("1");
  });
});
```

## テストの実行方法

テストを実行するには、以下のコマンドを使用します：

```bash
ng test
```

このコマンドは、Karma テストランナーを起動し、Jasmine テストフレームワークを使用してテストを実行します。テスト結果はブラウザに表示されます。

## 開発サーバーの起動

開発サーバーを起動するには、以下のコマンドを使用します：

```bash
ng serve
```

サーバーが起動したら、ブラウザで `http://localhost:4200/` にアクセスしてアプリケーションを確認できます。

## ビルド

プロジェクトをビルドするには、以下のコマンドを使用します：

```bash
ng build
```

ビルド成果物は `dist/` ディレクトリに格納されます。

## テストのトラブルシューティング

テスト実行時に発生した問題とその解決方法について説明します。

### 発生したエラー

最初のテスト実行では、以下の 2 つのエラーが発生しました：

1. `AppComponent should have the 'angular-counter-test' title`

   - 期待値: 'angular-counter-test'
   - 実際の値: 'Angular Counter Test'

2. `AppComponent should render title`
   - 期待値: 'Hello, angular-counter-test'
   - 実際の値: 'Angular Counter Test'

### エラーの原因

これらのエラーは、アプリケーション開発時に AppComponent のタイトルを変更したことが原因でした：

1. app.component.ts でタイトルを `'angular-counter-test'` から `'Angular Counter Test'` に変更
2. app.component.html のテンプレートを変更して、元の「Hello, angular-counter-test」というテキストが含まれなくなった

### 修正内容

AppComponent のテストファイル（app.component.spec.ts）を修正して、テストの期待値を実際の値と一致させました：

```typescript
// 修正前
it(`should have the 'angular-counter-test' title`, () => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.componentInstance;
  expect(app.title).toEqual("angular-counter-test");
});

it("should render title", () => {
  const fixture = TestBed.createComponent(AppComponent);
  fixture.detectChanges();
  const compiled = fixture.nativeElement as HTMLElement;
  expect(compiled.querySelector("h1")?.textContent).toContain("Hello, angular-counter-test");
});

// 修正後
it(`should have the 'Angular Counter Test' title`, () => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.componentInstance;
  expect(app.title).toEqual("Angular Counter Test");
});

it("should render title", () => {
  const fixture = TestBed.createComponent(AppComponent);
  fixture.detectChanges();
  const compiled = fixture.nativeElement as HTMLElement;
  expect(compiled.querySelector("h1")?.textContent).toContain("Angular Counter Test");
});
```

### 修正後のテスト結果

修正後、すべてのテストが成功しました：

```
Chrome Headless 133.0.0.0 (Windows 10): Executed 10 of 10 SUCCESS (0.08 secs / 0.066 secs)
TOTAL: 10 SUCCESS
```

これにより、AppComponent のテストとカウンターコンポーネントのテストの両方が正常に実行されるようになりました。

### テスト修正の教訓

1. コンポーネントの実装を変更した場合は、対応するテストも更新する必要があります
2. テストは実装の変更を検出するために存在するため、意図的な変更の場合はテストも適切に更新すべきです
3. テストエラーは必ずしもコードの問題を示すわけではなく、テスト自体が古くなっている可能性もあります

Angular CLI の最近のバージョンでは、`karma.conf.js`ファイルがデフォルトで作成されなくなっています。代わりに、`angular.json`内の`test`セクションに必要な設定が直接含まれるようになっています。これは Angular プロジェクトの構成をよりシンプルにするための変更です。

## 現在の設定における`ng test`の挙動

提供されている設定ファイルからわかる`ng test`の挙動は次のとおりです：

1. **Angular.json の test 設定が読み込まれる**:

   - ビルダーとして`@angular-devkit/build-angular:karma`が使用されています
   - `zone.js`と`zone.js/testing`がポリフィルとして読み込まれます
   - `tsconfig.spec.json`が TypeScript コンパイラ設定として使用されます
   - アセット、スタイル、スクリプトの設定が適用されます

2. **TypeScript コンパイル設定が適用される**:

   - `tsconfig.spec.json`に基づいて、`src/**/*.spec.ts`と`src/**/*.d.ts`ファイルがコンパイル対象となります
   - コンパイル出力は`./out-tsc/spec`ディレクトリに生成されます
   - Jasmine の型定義が読み込まれます

3. **Karma テストランナーが起動**:
   - 明示的な`karma.conf.js`がなくても、Angular CLI がデフォルト設定を適用します
   - Chrome ブラウザで Jasmine テストが実行されます

## karma.conf.js が必要な場合

`karma.conf.js`ファイルを生成して、以下のようなカスタマイズが可能になります：

- 別のブラウザでのテスト実行
- カスタムレポーターの追加
- テストのタイムアウト設定の変更
- カバレッジレポートの設定変更

生成された`karma.conf.js`ファイルは Angular CLI によって自動的に認識され、`angular.json`の設定と統合されます。

コマンドのエラーメッセージを見ると、Angular CLI で`karma-config`という名前のスキーマが見つからないようです。これは最新バージョンの Angular（特に Angular 17 以降）ではカルマ設定の生成方法が変わっているためです。

現在の Angular バージョンで Karma 設定ファイルを作成するには、次の方法を試してください：

## Karma 設定ファイルを手動で作成する方法

1. プロジェクトのルートディレクトリに`karma.conf.js`ファイルを作成します

2. 以下の基本的な内容をファイルに追加します：

```javascript
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [require("karma-jasmine"), require("karma-chrome-launcher"), require("karma-jasmine-html-reporter"), require("karma-coverage"), require("@angular-devkit/build-angular/plugins/karma")],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
      },
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }],
    },
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false,
    restartOnFileChange: true,
  });
};
```

3. 必要に応じて`angular.json`の`test`セクションを更新して、Karma 設定ファイルを参照するようにします：

```json
"test": {
  "builder": "@angular-devkit/build-angular:karma",
  "options": {
    "karmaConfig": "karma.conf.js",  // この行を追加
    "polyfills": [
      "zone.js",
      "zone.js/testing"
    ],
    // その他の設定...
  }
}
```

## 依存パッケージのインストール確認

必要な Karma 関連のパッケージがインストールされているか確認してください：

```bash
npm install --save-dev karma karma-jasmine karma-chrome-launcher karma-jasmine-html-reporter karma-coverage @angular-devkit/build-angular
```

この方法で作成した`karma.conf.js`ファイルは、Angular CLI によって認識され、テスト実行時に適用されます。

もし特に Karma 設定をカスタマイズする必要がなければ、現在の設定（`angular.json`内の設定）でも`ng test`は正常に実行できるはずです。Angular CLI はデフォルトの Karma 設定を内部的に生成して使用するためです。

## 現状でのテスト実行

現在の設定でも`ng test`コマンドは正常に動作します。Angular CLI はデフォルトの Karma 設定を内部的に生成し、`angular.json`の`test`セクションと`tsconfig.spec.json`の設定に基づいてテストを実行します。特別なカスタマイズが必要ない限り、追加の`karma.conf.js`ファイルは必須ではありません。

## コンポーネント間の連携と結合テスト

このプロジェクトでは、コンポーネント間のデータ連携と結合テストを実装しています。

### コンポーネント構成の拡張

#### 1. カウンターコンポーネント（既存）の拡張

カウンターコンポーネントを拡張し、カウント値の変更を外部に通知する機能を追加しました：

```typescript
import { Component, signal, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  standalone: true
})
export class CounterComponent {
  // Signalを使用してカウンター状態を管理
  count = signal(0);
  
  // カウント値の変更を通知するためのEventEmitter
  @Output() countChange = new EventEmitter<number>();

  // カウンターをインクリメントするメソッド
  increment() {
    this.count.update(value => value + 1);
    // 値が変更されたことを通知
    this.countChange.emit(this.count());
  }
}
```

#### 2. 表示コンポーネント（新規）の追加

カウンターコンポーネントから受け取った値を表示するための新しいコンポーネントを作成しました：

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display',
  imports: [],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
  standalone: true
})
export class DisplayComponent {
  // counterコンポーネントから受け取るカウント値
  @Input() countValue: number = 0;
}
```

表示コンポーネントのテンプレート：

```html
<div class="display-container">
  <h2>表示コンポーネント</h2>
  <div class="display-value">
    <p>カウンターの現在値: <span class="count-value">{{ countValue }}</span></p>
  </div>
</div>
```

#### 3. アプリコンポーネントでの連携

アプリコンポーネントで両方のコンポーネントを接続し、データの受け渡しを実装しました：

```typescript
import { Component } from '@angular/core';
import { CounterComponent } from './counter/counter.component';
import { DisplayComponent } from './display/display.component';

@Component({
  selector: 'app-root',
  imports: [CounterComponent, DisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'Angular Counter Test';
  
  // カウンターの値を保持する変数
  currentCount: number = 0;
  
  // カウンターコンポーネントからの値を受け取るメソッド
  onCountChange(count: number) {
    this.currentCount = count;
  }
}
```

アプリコンポーネントのテンプレート：

```html
<div class="app-container">
  <header>
    <h1>{{ title }}</h1>
  </header>
  <main>
    <!-- countChangeイベントをリッスンして、onCountChangeメソッドを呼び出す -->
    <app-counter (countChange)="onCountChange($event)"></app-counter>
    
    <!-- currentCount値をdisplayコンポーネントに渡す -->
    <app-display [countValue]="currentCount"></app-display>
  </main>
</div>
```

### コンポーネント間のデータフロー

このアプリケーションでは、以下のようなデータフローを実装しています：

1. ユーザーが「増加」ボタンをクリックする
2. カウンターコンポーネントの `increment()` メソッドが呼び出される
3. カウント値が更新され、`countChange` イベントが発行される
4. アプリコンポーネントの `onCountChange()` メソッドがイベントを受け取り、`currentCount` を更新する
5. 表示コンポーネントの `countValue` プロパティが更新され、UI が更新される

### 結合テストの実装

コンポーネント間の連携をテストするための結合テストを実装しました：

```typescript
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
```

### 結合テストの意義

結合テストは、複数のコンポーネントが連携して正しく動作することを確認するために重要です。このプロジェクトでは、以下の点を検証しています：

1. 初期状態の確認：両方のコンポーネントが正しい初期値を持っているか
2. イベント伝播の確認：カウンターコンポーネントのイベントが正しく親コンポーネントに伝わるか
3. データバインディングの確認：親コンポーネントから子コンポーネントへのデータバインディングが正しく機能するか
4. 複数回の操作後の状態確認：複数回の操作後も一貫して正しい値が表示されるか

これにより、コンポーネント間の連携が意図したとおりに機能することを保証し、将来の変更によって連携が壊れないようにしています。

## E2Eテスト

このプロジェクトでは、Playwrightを使用したE2Eテストを実装しています。

### Playwrightの導入

Playwrightは、Microsoftが開発したモダンなE2Eテストフレームワークで、複数のブラウザ（Chromium、Firefox、WebKit）でのテストをサポートしています。

#### インストール

```bash
# Playwrightパッケージのインストール
npm install -D @playwright/test

# ブラウザのインストール
npx playwright install
```

#### 設定ファイル

`playwright.config.ts`ファイルでテスト環境を設定しています：

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env['CI'],
  },
});
```

### テストシナリオ

E2Eテストでは、以下のシナリオをテストしています：

1. ページタイトルの確認
2. 初期状態でカウンターの値が0であることの確認
3. 「増加」ボタンクリック時のカウンター値の増加確認
4. 複数回クリック時の動作確認
5. カウンターコンポーネントと表示コンポーネント間の値の同期確認
6. UIコンポーネントの表示確認

### テスト実装例

```typescript
import { test, expect } from '@playwright/test';

test.describe('カウンターアプリケーションのE2Eテスト', () => {
  // 各テストの前にページを読み込む
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('ページタイトルが正しく表示されること', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Angular Counter Test');
  });

  test('初期状態でカウンターの値が0であること', async ({ page }) => {
    await expect(page.locator('.counter-value')).toHaveText('0');
    await expect(page.locator('.count-value')).toHaveText('0');
  });

  test('増加ボタンをクリックするとカウンターの値が増加すること', async ({ page }) => {
    const incrementButton = page.locator('.increment-button');
    
    // 初期値を確認
    await expect(page.locator('.counter-value')).toHaveText('0');
    
    // ボタンをクリック
    await incrementButton.click();
    
    // カウンターの値が1になったことを確認
    await expect(page.locator('.counter-value')).toHaveText('1');
    await expect(page.locator('.count-value')).toHaveText('1');
  });
});
```

### E2Eテストの実行方法

E2Eテストを実行するには、以下のコマンドを使用します：

```bash
# すべてのテストを実行
npm run e2e

# UIモードでテストを実行（テストランナーUIを使用）
npm run e2e:ui
```

### テストレポート

テスト実行後、HTMLレポートが生成されます。レポートを表示するには：

```bash
npx playwright show-report
```

### E2Eテストの利点

1. **実際のユーザー体験のシミュレーション**：実際のブラウザでアプリケーションを操作し、ユーザーの視点からテストします。
2. **複数ブラウザでのテスト**：Chromium、Firefox、WebKitの3つの主要ブラウザエンジンでテストを実行し、クロスブラウザの互換性を確保します。
3. **視覚的なデバッグ**：テスト失敗時にスクリーンショットを取得し、問題の特定を容易にします。
4. **自動化されたテスト**：CI/CD環境で自動的にテストを実行し、継続的な品質保証を実現します。

E2Eテストを単体テストや結合テストと組み合わせることで、アプリケーションの品質を多層的に保証することができます。
