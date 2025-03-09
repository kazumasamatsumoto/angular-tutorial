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
