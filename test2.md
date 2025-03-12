```ts
// カスタムプロジェクト構造用のテスト設定
import "zone.js/testing";
import { getTestBed } from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";

// 基本のAngularテスト環境を初期化
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

console.log("カスタム構造向けのテスト環境が初期化されました");

// Angularが自動的にテストファイルを検出するのを待ちます
```

```ts
"test": {
  "builder": "@angular-devkit/build-angular:karma",
  "options": {
    "main": "common/src/test.ts",
    "polyfills": ["@angular/localize/init", "zone.js", "zone.js/testing"],
    "tsConfig": "tsconfig.spec.json",
    "karmaConfig": "karma.conf.js",
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
    "scripts": []
  }
}
```

```ts
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["jasmine", "node"]
  },
  "files": [
    "common/src/test.ts"
  ],
  "include": [
    "common/src/**/*.spec.ts",
    "common/src/**/*.d.ts"
  ]
}
```

```ts
describe("サンプルテスト", () => {
  it("基本的なテストが動くこと", () => {
    console.log("カスタム構造のテストが実行されました！");
    expect(true).toBeTruthy();
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
      clearContext: false,
    },
    jasmineHtmlReporter: {
      suppressAll: true,
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage/frontend"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }],
    },
    reporters: ["progress", "kjhtml"],
    browsers: ["Chrome"],
    restartOnFileChange: true,
    // ログレベルを上げて詳細情報を表示
    logLevel: config.LOG_DEBUG,
  });
};
```
