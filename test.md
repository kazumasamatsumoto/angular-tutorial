```ts
// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import "zone.js/testing";
import { getTestBed } from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Type definition for context modules
declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    <T>(id: string): T;
    keys(): string[];
  };
};

// デバッグメッセージを追加
console.log("=== test.ts が実行されました ===");

function loadTests(contextPath: string) {
  console.log(`${contextPath} のテストファイルを探しています...`);

  try {
    // より明示的なエラーハンドリング
    if (!require || typeof require.context !== "function") {
      console.error(
        "require.context が利用できません。webpack環境が正しく設定されているか確認してください。"
      );
      return;
    }

    const context = require.context(contextPath, true, /\.spec\.ts$/);
    const keys = context.keys();

    console.log(`${contextPath} で見つかったテストファイル:`, keys);

    if (keys.length === 0) {
      console.warn(
        `${contextPath} にテストファイル (.spec.ts) が見つかりませんでした`
      );
    } else {
      keys.forEach((key) => {
        console.log(`テストファイルを読み込みます: ${key}`);
        try {
          context(key);
          console.log(`${key} を正常に読み込みました`);
        } catch (err) {
          console.error(`${key} の読み込み中にエラーが発生しました:`, err);
        }
      });
    }
  } catch (e) {
    console.error(
      `${contextPath} からのテスト読み込み中にエラーが発生しました:`,
      e
    );
  }
}

// 絶対パスと相対パスの両方を試す
console.log("以下のパスからテストファイルをロードします:");

try {
  // 相対パス（一般的）
  loadTests("./src/");
  loadTests("./common/src/");

  // 代替パスも試す
  loadTests("src/");
  loadTests("common/src/");
} catch (e) {
  console.error("テストロード中に重大なエラーが発生しました:", e);
}
```

```ts
describe("SampleTest", () => {
  it("should be true", () => {
    console.log("サンプルテストが実行されました");
    expect(true).toBe(true);
  });
});
```

```ts
// Karma configuration file
module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO, // ログレベルをINFOに設定
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false,
    restartOnFileChange: true,
  });
};
```

```ts
"test": {
  "builder": "@angular-devkit/build-angular:karma",
  "options": {
    "main": "src/test.ts",  // Angular 12以降の一般的な場所
    "polyfills": ["zone.js", "zone.js/testing"],
    "tsConfig": "tsconfig.spec.json",
    "karmaConfig": "karma.conf.js",
    "inlineStyleLanguage": "less",
    "assets": [
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
    "scripts": [],
    "codeCoverage": true,
    "sourceMap": true,
    "browsers": "Chrome"
  }
}
```
