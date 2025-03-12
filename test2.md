```ts
// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import "zone.js/testing";
import { getTestBed } from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";

// Initialize the Angular testing environment
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

console.log("テスト環境が初期化されました");

// Angular 14以降では、テストファイルの検出は自動的に行われるため、
// require.contextを明示的に使用する必要はありません。
// angular.jsonの設定に従って自動的にテストファイルが検出されます。

// テストの手動検出は必要ありません。
// もしテスト実行時に問題が発生する場合は、
// Angular CLIの設定を確認してください。
```

```ts
"test": {
  "builder": "@angular-devkit/build-angular:karma",
  "options": {
    "main": "src/test.ts",
    "polyfills": ["zone.js", "zone.js/testing"],
    "tsConfig": "tsconfig.spec.json",
    "karmaConfig": "karma.conf.js",
    "inlineStyleLanguage": "css",
    "assets": [
      "src/favicon.ico",
      "src/assets",
      {
        "glob": "**/*",
        "input": "./common/src/assets/",
        "output": "/assets/"
      }
    ],
    "styles": [
      "./common/src/styles.css",
      "./common/src/styles.common.css"
    ],
    "scripts": []
  }
}
```

```ts
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
      "jasmine",
      "node"
    ]
  },
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts",
    "common/src/**/*.spec.ts",
    "common/src/**/*.d.ts"
  ],
  "files": [
    "src/test.ts"
  ]
}
```

```ts
import { TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";

// テスト用のダミーコンポーネント
@Component({
  selector: "app-dummy",
  template: "<div>ダミーコンポーネント</div>",
})
class DummyComponent {}

describe("基本テスト", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DummyComponent],
    }).compileComponents();
  });

  it("真がtrueであること", () => {
    console.log("基本テストが実行されました");
    expect(true).toBeTruthy();
  });

  it("コンポーネントが作成できること", () => {
    const fixture = TestBed.createComponent(DummyComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
```

```ts
import { TestBed } from "@angular/core/testing";

describe("Common基本テスト", () => {
  it("真がtrueであること", () => {
    console.log("Common内のテストが実行されました");
    expect(true).toBeTruthy();
  });
});
```
