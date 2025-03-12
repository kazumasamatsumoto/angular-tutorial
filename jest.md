テストの設定で悩まれているのであれば、Jest への移行は十分に検討する価値があると思います。

## 現状の問題

現在の Karma+Jasmine の設定で「コードを更新しても何も変わらない」という状況は、以下のような原因が考えられます：

1. ファイルの監視が正しく機能していない
2. テストファイルが正しく認識されていない
3. カスタムプロジェクト構造が Angular のデフォルトテスト環境と相性が悪い
4. Karma の設定が正しく読み込まれていない

## Jest への移行のメリット

Jest への移行には以下のメリットがあります：

1. **シンプルな設定**: Karma と比べて設定が簡単
2. **高速なテスト実行**: 並列実行やスマートな実行順序によりテスト実行が高速
3. **スナップショットテスト**: UI コンポーネントのレグレッションテストが容易
4. **モックの充実**: 依存関係のモックが簡単
5. **ファイル監視の信頼性**: 変更を検出して再実行する機能が安定している

## Jest 導入のステップ

Jest を導入するための基本的な手順は以下の通りです：

```bash
# 必要なパッケージのインストール
npm install --save-dev jest @types/jest jest-preset-angular @angular-builders/jest

# Karma関連のパッケージを削除（オプション）
npm uninstall karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter @angular-devkit/build-angular
```

次に、Jest の設定ファイルを作成します：

jest.config.js

```ts
module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
    },
  },
  moduleNameMapper: {
    // カスタムプロジェクト構造に合わせたパスマッピング
    "^@/(.*)$": "<rootDir>/$1",
    "^@common/(.*)$": "<rootDir>/common/src/$1",
  },
  testMatch: ["**/*.spec.ts"],
  moduleFileExtensions: ["ts", "html", "js", "json"],
  transform: {
    "^.+\\.(ts|js|html)$": "jest-preset-angular",
  },
  // カスタム構造に合わせたルートディレクトリ
  roots: ["<rootDir>/common/src/"],
};
```

Jest のセットアップファイルも作成します：

setup-jest.js

```ts
import "jest-preset-angular/setup-jest";

// グローバルなmock
Object.defineProperty(window, "CSS", { value: null });
Object.defineProperty(document, "doctype", {
  value: "<!DOCTYPE html>",
});
Object.defineProperty(window, "getComputedStyle", {
  value: () => {
    return {
      display: "none",
      appearance: ["-webkit-appearance"],
    };
  },
});
Object.defineProperty(document.body.style, "transform", {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});
```

angular.json を更新して、Jest を使用するように変更します：

```json
"test": {
  "builder": "@angular-builders/jest:run",
  "options": {
    "configPath": "./jest.config.js",
    "tsConfig": "tsconfig.spec.json"
  }
}
```

tsconfig.spec.json も更新します：

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["jest", "node"],
    "esModuleInterop": true,
    "emitDecoratorMetadata": true
  },
  "include": ["common/src/**/*.spec.ts", "common/src/**/*.d.ts"]
}
```

package.json のテストスクリプトも更新します：

```json
"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "watch": "ng build --watch --configuration development",
  "test": "ng test",
  "test:watch": "ng test --watch",
  "test:coverage": "ng test --coverage",
  "e2e": "playwright test"
}
```

## Playwright との組み合わせ

Playwright を使った E2E テストの基本的な設定も追加しましょう：

```bash
# Playwrightのインストール
npm install --save-dev @playwright/test

# ブラウザをインストール
npx playwright install
```

Playwright の設定ファイルを作成します：

playwright.config.ts

```ts
import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./e2e",
  timeout: 30000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    baseURL: "http://localhost:4200",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
    {
      name: "firefox",
      use: { browserName: "firefox" },
    },
    {
      name: "webkit",
      use: { browserName: "webkit" },
    },
  ],
};

export default config;
```

E2E テストのサンプルも作成しておきましょう：

e2e/sample.spec.ts

```ts
import { test, expect } from "@playwright/test";

test("基本的なE2Eテスト", async ({ page }) => {
  // アプリケーションのホームページにアクセス
  await page.goto("/");

  // タイトルを確認
  const title = await page.title();
  expect(title).toBeTruthy();

  // スクリーンショットを撮影
  await page.screenshot({ path: "homepage.png" });
});
```

## カスタムプロジェクト構造向けのサンプルテスト

Jest でテストを書くためのサンプルコードも作成しておきましょう：

```ts
import { TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";

// テスト用のダミーコンポーネント
@Component({
  selector: "app-sample",
  template: "<div>サンプルコンポーネント</div>",
})
class SampleComponent {}

describe("サンプルテスト", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SampleComponent],
    }).compileComponents();
  });

  it("Jestを使用した基本的なテストが動作すること", () => {
    console.log("Jestを使用したテストが実行されました！");
    expect(true).toBeTruthy();
  });

  it("コンポーネントが作成できること", () => {
    const fixture = TestBed.createComponent(SampleComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
```

## テスト実行

設定が完了したら、以下のコマンドでテストを実行できます：

```bash
# 単体・結合テスト（Jest）
npm test

# 監視モードでテスト実行
npm run test:watch

# テストカバレッジレポート作成
npm run test:coverage

# E2Eテスト（Playwright）
npm run e2e
```

## 実装の移行について

1. **既存のテストコードの移行**:

   - Jasmine/Karma のテストコードはほとんどの場合、Jest 向けにそのまま使えます
   - `beforeEach`、`it`、`describe`などの関数は同じように動作します
   - テストのセットアップが少し異なる部分があるので、必要に応じて修正してください

2. **非標準プロジェクト構造への対応**:
   - Jest 設定の`roots`で指定したディレクトリ以下のテストファイルが検出されます
   - `moduleNameMapper`でパスのエイリアスを設定できるので、インポートパスが複雑な場合でも対応可能です

Jest はシンプルな設定と高速なテスト実行が魅力で、Playwright はモダンな E2E テスト環境として非常に優れています。この組み合わせは多くの Angular プロジェクトで採用されており、テスト効率の向上につながるでしょう。
