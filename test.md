# テスト

Angular アプリケーションをテストすると、アプリケーションが期待どおりに動作していることを確認できます。

## テストの設定

Angular CLI は、[Jasmine テストフレームワーク](https://jasmine.github.io)を使用して Angular アプリケーションをテストするために必要なものをすべてダウンロードしてインストールします。

CLI で作成したプロジェクトは、すぐにテストできます。
[`ng test`](cli/test) CLI コマンドを実行するだけです。

<docs-code language="shell">

ng test

</docs-code>

`ng test`コマンドはアプリケーションを*監視モード*でビルドし、
[Karma テストランナー](https://karma-runner.github.io)を起動します。

コンソールの出力は次のようになります。

<docs-code language="shell">

02 11 2022 09:08:28.605:INFO [karma-server]: Karma v6.4.1 server started at http://localhost:9876/
02 11 2022 09:08:28.607:INFO [launcher]: Launching browsers Chrome with concurrency unlimited
02 11 2022 09:08:28.620:INFO [launcher]: Starting browser Chrome
02 11 2022 09:08:31.312:INFO [Chrome]: Connected on socket -LaEYvD2R7MdcS0-AAAB with id 31534482
Chrome: Executed 3 of 3 SUCCESS (0.193 secs / 0.172 secs)
TOTAL: 3 SUCCESS

</docs-code>

ログの最後の行は、Karma が 3 つのテストを実行し、すべてが合格したことを示しています。

テスト出力は、[Karma Jasmine HTML レポーター](https://github.com/dfederm/karma-jasmine-html-reporter)を使用してブラウザに表示されます。

<img alt="Jasmine HTML Reporter in the browser" src="assets/images/guide/testing/initial-jasmine-html-reporter.png">

テスト行をクリックしてそのテストのみを再実行するか、説明をクリックして選択したテストグループ（「テストスイート」）のテストを再実行します。

一方、`ng test`コマンドは変更を監視しています。

これが実際にどのように機能するかを確認するには、`app.component.ts`を少し変更して保存します。
テストが再び実行され、ブラウザが更新され、新しいテスト結果が表示されます。

## 設定

Angular CLI は、Jasmine と Karma の設定を処理します。Angular CLI は、`angular.json`ファイルで指定されたオプションに基づいて、メモリ内に完全な設定を構築します。

Karma をカスタマイズする場合は、次のコマンドを実行して`karma.conf.js`を作成できます。

<docs-code language="shell">

ng generate config karma

</docs-code>

HELPFUL: [Karma 設定ガイド](http://karma-runner.github.io/6.4/config/configuration-file.html)で Karma の設定について詳しく知ることができます。

### その他のテストフレームワーク

Angular アプリケーションは、他のテストライブラリとテストランナーでもユニットテストできます。
各ライブラリとランナーには、それぞれ独自のインストール手順、構成、構文があります。

### テストファイル名と場所

Angular CLI は、`src/app`フォルダ内に`AppComponent`のテストファイルを`app.component.spec.ts`という名前で生成しました。

IMPORTANT: テストファイル拡張子は**`.spec.ts`でなければなりません**。これにより、ツールはファイルをテストを含むファイル（*spec*ファイルとも呼ばれる）として識別できます。

`app.component.ts`と`app.component.spec.ts`ファイルは、同じフォルダ内の兄弟です。
ルートファイル名（`app.component`）は、両方のファイルで同じです。

あらゆる種類のテストファイルに対して、これらの 2 つの規則を独自のプロジェクトで採用してください。

#### テストするファイルの横に spec ファイルを配置する

ユニットテストの spec ファイルを、
テストするアプリケーションソースコードファイルと同じフォルダに入れることをお勧めします。

- このようなテストは簡単に検索できます。
- アプリケーションの一部にテストがないかどうかをひと目で確認できます。
- 近くのテストは、一部がコンテキストでどのように機能するかを示すことができます。
- ソースを移動すると（不可避ですが）、テストも移動することを思い出します。
- ソースファイルを名前変更すると（不可避ですが）、テストファイルの名前も変更することを思い出します。

#### spec ファイルをテストフォルダに配置する

アプリケーションの統合 spec は、
フォルダとモジュールにまたがる複数の部分の相互作用をテストできます。
それらは、特にどの部分にも属していないため、
特定のファイルの横に自然な場所がありません。

多くの場合、それらに対して`tests`ディレクトリに適切なフォルダを作成する方が良いでしょう。

もちろん、テストヘルパーをテストする spec は、
対応するヘルパーファイルの隣の`test`フォルダに入ります。

## 継続的インテグレーションでのテスト

プロジェクトをバグなしに保つ最良の方法の 1 つは、テストスイートを使用することですが、常にテストを実行することを忘れてしまうかもしれません。

継続的インテグレーション（CI）サーバーを使用すると、プロジェクトリポジトリを設定して、すべてのコミットとプルリクエストでテストを実行できます。

Angular CLI アプリケーションを継続的インテグレーション（CI）でテストするには、次のコマンドを実行します。

<docs-code language="shell">
ng test --no-watch --no-progress --browsers=ChromeHeadless
</docs-code>

## テストに関する追加情報

アプリケーションのテストを設定したら、次のテストガイドが役立つ場合があります。

|                                                                    | 詳細                                                                             |
| :----------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| [コードカバレッジ](guide/testing/code-coverage)                    | テストがアプリケーションのどの部分をカバーしているか、および必要な量の指定方法。 |
| [サービスのテスト](guide/testing/services)                         | アプリケーションで使用しているサービスのテスト方法。                             |
| [コンポーネントのテストの基本](guide/testing/components-basics)    | Angular コンポーネントのテストの基本。                                           |
| [コンポーネントテストシナリオ](guide/testing/components-scenarios) | さまざまな種類のコンポーネントテストシナリオとユースケース。                     |
| [属性ディレクティブのテスト](guide/testing/attribute-directives)   | 属性ディレクティブのテスト方法。                                                 |
| [パイプのテスト](guide/testing/pipes)                              | パイプのテスト方法。                                                             |
| [テストのデバッグ](guide/testing/debugging)                        | 一般的なテストのバグ。                                                           |
| [ユーティリティ API のテスト](guide/testing/utility-apis)          | Angular のテスト機能。                                                           |

# テストされているコードの量を確認する

Angular CLI は、単体テストを実行し、コードカバレッジレポートを作成できます。
コードカバレッジレポートは、単体テストで適切にテストされていないコードベースの箇所を示します。

カバレッジレポートを生成するには、プロジェクトのルートで次のコマンドを実行します。

<docs-code language="shell">
ng test --no-watch --code-coverage
</docs-code>

テストが完了すると、コマンドによってプロジェクトに新しい `/coverage` ディレクトリが作成されます。
`index.html` ファイルを開くと、ソースコードとコードカバレッジ値を含むレポートが表示されます。

テストを実行するたびにコードカバレッジレポートを作成する場合は、Angular CLI 構成ファイル `angular.json` に次のオプションを設定します。

<docs-code language="json">
"test": {
  "options": {
    "codeCoverage": true
  }
}
</docs-code>

## コードカバレッジの強制

コードカバレッジのパーセンテージは、コードのどの程度がテストされているかを推定できます。
チームが単体テストを行う最小限の量を決定した場合、Angular CLI でその最小限を強制できます。

たとえば、コードベースのコードカバレッジを最低 80% にしたいとします。
これを有効にするには、[Karma](https://karma-runner.github.io) テストプラットフォーム構成ファイル `karma.conf.js` を開き、`coverageReporter:` キーに `check` プロパティを追加します。

<docs-code language="javascript">
coverageReporter: {
  dir: require('path').join(__dirname, './coverage/<project-name>'),
  subdir: '.',
  reporters: [
    { type: 'html' },
    { type: 'text-summary' }
  ],
  check: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  }
}
</docs-code>

HELPFUL: [テストガイド](guide/testing#configuration) で、Karma 構成の作成と微調整について詳しく説明しています。

`check` プロパティによって、プロジェクトで単体テストを実行すると、最低 80% のコードカバレッジが強制されます。

[karma カバレッジドキュメント](https://github.com/karma-runner/karma-coverage/blob/master/docs/configuration.md) で、カバレッジ構成オプションの詳細を確認してください。

# サービスのテスト

サービスが意図通りに動作していることを確認するには、サービス専用のテストを作成できます。

サービスは、多くの場合、ユニットテストを実行するのに最もスムーズなファイルです。
以下は、Angular テストユーティリティの助けを借りずに記述された `ValueService` の同期および非同期のユニットテストです。

<docs-code header="app/demo/demo.spec.ts" path="adev/src/content/examples/testing/src/app/demo/demo.spec.ts" visibleRegion="ValueService"/>

## 依存関係のあるサービス

サービスは、Angular がコンストラクターに注入する他のサービスに依存することがよくあります。
多くの場合、サービスのコンストラクターを呼び出す際に、これらの依存関係を手動で作成して _注入_ できます。

`MasterService` は、単純な例です。

<docs-code header="app/demo/demo.ts" path="adev/src/content/examples/testing/src/app/demo/demo.ts" visibleRegion="MasterService"/>

`MasterService` は、唯一のメソッドである `getValue` を、注入された `ValueService` に委譲します。

テストを行うには、いくつかの方法があります。

<docs-code header="app/demo/demo.spec.ts" path="adev/src/content/examples/testing/src/app/demo/demo.spec.ts" visibleRegion="MasterService"/>

最初のテストでは、`new` で `ValueService` を作成し、`MasterService` コンストラクターに渡します。

ただし、実際のサービスを注入することは、ほとんどの場合、うまく機能しません。ほとんどの依存サービスは作成と制御が難しいからです。

代わりに、依存関係をモック化し、ダミー値を使用するか、関連するサービスメソッドに [スパイ](https://jasmine.github.io/tutorials/your_first_suite#section-Spies) を作成します。

HELPFUL: スパイは、通常、サービスをモック化する最良の方法なので、スパイを使用することをお勧めします。

これらの標準的なテストテクニックは、サービスを単体でユニットテストするのに適しています。

ただし、ほとんどの場合、Angular の依存関係注入を使用してサービスをアプリケーションクラスに注入します。そのため、その使用パターンを反映したテストを行う必要があります。
Angular のテストユーティリティを使用すると、注入されたサービスがどのように動作するかを簡単に調査できます。

## `TestBed` を使用したサービスのテスト

アプリケーションは、Angular の [依存関係注入 (DI)](guide/di) に依存してサービスを作成します。
サービスが依存サービスを持っている場合、DI はその依存サービスを見つけたり、作成します。
さらに、その依存サービスに独自の依存関係がある場合、DI はそれらも探し出して作成します。

サービスの _消費者_ として、あなたはこれらについて心配する必要はありません。
コンストラクター引数の順序や、それらがどのように作成されるかについて心配する必要はありません。

サービスの _テスター_ として、少なくともサービス依存関係の最初のレベルについて考える必要はありますが、`TestBed` テストユーティリティを使用してサービスを提供して作成し、コンストラクター引数の順序を処理するときは、Angular DI にサービスの作成を任せることができます。

## Angular `TestBed`

`TestBed` は、Angular のテストユーティリティの中で最も重要なものです。
`TestBed` は、Angular の [@NgModule](guide/ngmodules) をエミュレートする、動的に構築された Angular の _テスト_ モジュールを作成します。

`TestBed.configureTestingModule()` メソッドは、[@NgModule](guide/ngmodules) のほとんどのプロパティを持つことができるメタデータオブジェクトを受け取ります。

サービスをテストするには、テストまたはモックするサービスの配列を `providers` メタデータプロパティに設定します。

<docs-code header="app/demo/demo.testbed.spec.ts (beforeEach で ValueService を提供)" path="adev/src/content/examples/testing/src/app/demo/demo.testbed.spec.ts" visibleRegion="value-service-before-each"/>

次に、サービスクラスを引数として `TestBed.inject()` を呼び出して、テスト内でサービスを注入します。

HELPFUL: `TestBed.get()` は、Angular バージョン 9 以降で非推奨になりました。
重大な変更を最小限に抑えるため、Angular は `TestBed.inject()` という新しい関数を導入しました。これは、代わりに使用する必要があります。

<docs-code path="adev/src/content/examples/testing/src/app/demo/demo.testbed.spec.ts" visibleRegion="value-service-inject-it"/>

または、セットアップの一部としてサービスを注入したい場合は、`beforeEach()` 内で行います。

<docs-code path="adev/src/content/examples/testing/src/app/demo/demo.testbed.spec.ts" visibleRegion="value-service-inject-before-each"> </docs-code>

依存関係のあるサービスをテストする場合は、`providers` 配列にモックを提供します。

次の例では、モックはスパイオブジェクトです。

<docs-code path="adev/src/content/examples/testing/src/app/demo/demo.testbed.spec.ts" visibleRegion="master-service-before-each"/>

テストでは、以前と同じように、そのスパイを使用します。

<docs-code path="adev/src/content/examples/testing/src/app/demo/demo.testbed.spec.ts" visibleRegion="master-service-it"/>

## `beforeEach()` を使用しないテスト

このガイドのほとんどのテストスイートでは、`beforeEach()` を呼び出して各 `it()` テストの前提条件を設定し、`TestBed` にクラスの作成とサービスの注入を任せています。

`beforeEach()` を呼び出さない、別のテストの考え方があり、`TestBed` を使用せず、クラスを明示的に作成することを好みます。

このスタイルで `MasterService` のテストの 1 つを書き直す方法を以下に示します。

最初に、_セットアップ_ 関数に、再利用可能な準備コードを `beforeEach()` の代わりに配置します。

<docs-code header="app/demo/demo.spec.ts (setup)" path="adev/src/content/examples/testing/src/app/demo/demo.spec.ts" visibleRegion="no-before-each-setup"/>

`setup()` 関数は、テストで参照できる可能性のある変数 `masterService` などの変数を、オブジェクトリテラルとして返します。
`describe()` の本文には、_半グローバル_ 変数（例：`let masterService: MasterService`）は定義しません。

次に、各テストは、テスト対象の操作や期待の主張を続行する前に、最初の行で `setup()` を呼び出します。

<docs-code path="adev/src/content/examples/testing/src/app/demo/demo.spec.ts" visibleRegion="no-before-each-test"/>

テストで [_デストラクチャリング代入_](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) を使用して、必要なセットアップ変数を抽出したことに注意してください。

<docs-code path="adev/src/content/examples/testing/src/app/demo/demo.spec.ts" visibleRegion="no-before-each-setup-call"/>

多くの開発者は、このアプローチは従来の `beforeEach()` スタイルよりもクリーンで明示的だと感じるでしょう。

このテストガイドでは、従来のスタイルと、デフォルトの [CLI スキーマ](https://github.com/angular/angular-cli) で `beforeEach()` と `TestBed` を使用してテストファイルが生成されますが、独自のプロジェクトで _この代替アプローチ_ を採用することは自由です。

## HTTP サービスのテスト

リモートサーバーに HTTP 呼び出しするデータサービスは、通常、Angular の [`HttpClient`](guide/http/testing) サービスを注入して委譲し、XHR を呼び出します。

依存関係が注入された `HttpClient` スパイを使用して、データサービスをテストできます。

<docs-code header="app/model/hero.service.spec.ts (スパイを使用したテスト)" path="adev/src/content/examples/testing/src/app/model/hero.service.spec.ts" visibleRegion="test-with-spies"/>

IMPORTANT: `HeroService` メソッドは `Observable` を返します。
Observable に _登録_ することで、(a) 実行させ、(b) メソッドが成功したか失敗したかをアサートする必要があります。

`subscribe()` メソッドは、成功 (`next`) と失敗 (`error`) のコールバックを受け取ります。
エラーを捕捉するために、_両方の_ コールバックを提供してください。
これを怠ると、非同期でキャッチされない Observable エラーが発生し、テストランナーは別のテストによるエラーであると判断する可能性があります。

## `HttpClientTestingModule`

データサービスと `HttpClient` の間の拡張されたやり取りは複雑で、スパイでモック化するのは難しい場合があります。

`HttpClientTestingModule` を使用すると、これらのテストシナリオをより管理しやすくなります。

このガイドに付属する _コードサンプル_ では `HttpClientTestingModule` が示されていますが、このページでは、`HttpClientTestingModule` を使用したテストを詳しく説明している [HTTP ガイド](guide/http/testing) を参照します。

# コンポーネントテストの基本

コンポーネントは、Angular アプリケーションの他のすべての部分とは異なり、HTML テンプレートと TypeScript クラスを組み合わせたものです。
コンポーネントは、実際にはテンプレートとクラスが _連携_ したものです。
コンポーネントを適切にテストするには、意図したとおりに連携して動作することをテストする必要があります。

このようなテストには、Angular と同様にブラウザの DOM にコンポーネントのホスト要素を作成し、そのテンプレートで記述されているように、DOM とのコンポーネントクラスの対話を調査することが必要です。

Angular の `TestBed` は、次のセクションで説明するように、この種類のテストを容易にします。
しかし、多くの場合、_DOM を伴わないコンポーネントクラス単独のテスト_ は、コンポーネントの動作の大部分を、より簡単で明らかな方法で検証できます。

## コンポーネント DOM テスト

コンポーネントは、そのクラスだけではありません。
コンポーネントは DOM と他のコンポーネントと対話します。
クラスだけでは、コンポーネントが正しくレンダリングされるか、ユーザーの入力やジェスチャーに応答するか、親コンポーネントと子コンポーネントと統合されるかを判断できません。

- `Lightswitch.clicked()` はユーザーが呼び出せるように何かとバインドされていますか？
- `Lightswitch.message` は表示されますか？
- ユーザーは `DashboardHeroComponent` によって表示されるヒーローを実際に選択できますか？
- ヒーローの名前は期待通り（たとえば、大文字）に表示されますか？
- `WelcomeComponent` のテンプレートによってウェルカムメッセージは表示されますか？

これらの質問は、説明した前の簡単なコンポーネントにとっては問題ないかもしれません。
しかし、多くのコンポーネントは、そのテンプレートで記述されている DOM 要素との複雑な対話を持ち、コンポーネントの状態が変わると HTML が表示および非表示になります。

これらの質問に答えるには、コンポーネントに関連付けられた DOM 要素を作成し、DOM を調べて適切なタイミングでコンポーネントの状態が正しく表示されていることを確認します。そしてユーザーが画面と対話するようにシミュレートして、それらの対話がコンポーネントが期待通りに動作するかどうかを判断する必要があります。

これらの種類のテストを書くには、`TestBed` の追加機能と、他のテストヘルパーを使用します。

### CLI で生成されたテスト

CLI は、新しいコンポーネントの生成を要求するときに、デフォルトで初期テストファイルを自動的に生成します。

たとえば、次の CLI コマンドは `app/banner` フォルダーに `BannerComponent` を生成します（インラインテンプレートとスタイル付き）。

<docs-code language="shell">

ng generate component banner --inline-template --inline-style --module app

</docs-code>

また、コンポーネントの初期テストファイル `banner-external.component.spec.ts` も生成し、次のようになります。

<docs-code header="app/banner/banner-external.component.spec.ts (初期)" path="adev/src/content/examples/testing/src/app/banner/banner-initial.component.spec.ts" visibleRegion="v1"/>

HELPFUL: `compileComponents` は非同期であるため、`@angular/core/testing` からインポートされた [`waitForAsync`](api/core/testing/waitForAsync) ユーティリティ関数を使用します。

詳細については、[waitForAsync](guide/testing/components-scenarios#waitForAsync) セクションを参照してください。

### セットアップの削減

このファイルの最後の 3 行だけが実際にコンポーネントをテストしており、Angular がコンポーネントを作成できることをアサートするだけです。

ファイルの残りの部分は、コンポーネントが実質的なものへと進化した場合に必要になる可能性のある、より高度なテストを予期した定型文のセットアップコードです。

これらの高度なテスト機能については、次のセクションで説明します。
今のところ、このテストファイルをより管理しやすいサイズに大幅に縮小できます。

<docs-code header="app/banner/banner-initial.component.spec.ts (最小限)" path="adev/src/content/examples/testing/src/app/banner/banner-initial.component.spec.ts" visibleRegion="v2"/>

この例では、`TestBed.configureTestingModule` に渡されるメタデータオブジェクトは、単にテスト対象のコンポーネントである `BannerComponent` を宣言します。

<docs-code path="adev/src/content/examples/testing/src/app/banner/banner-initial.component.spec.ts" visibleRegion="configureTestingModule"/>

HELPFUL: 他のものを宣言したりインポートする必要はありません。
デフォルトのテストモジュールは、`@angular/platform-browser` の `BrowserModule` などのモジュールで事前に構成されています。

後で `TestBed.configureTestingModule()` を呼び出して、インポート、プロバイダー、その他の宣言を追加して、テストのニーズに合わせて構成します。
オプションの `override` メソッドは、構成の側面をさらに微調整できます。

### `createComponent()`

`TestBed` を構成したら、その `createComponent()` メソッドを呼び出します。

<docs-code path="adev/src/content/examples/testing/src/app/banner/banner-initial.component.spec.ts" visibleRegion="createComponent"/>

`TestBed.createComponent()` は `BannerComponent` のインスタンスを作成し、対応する要素をテストランナーの DOM に追加し、[`ComponentFixture`](#componentfixture) を返します。

IMPORTANT: `createComponent` を呼び出した後に `TestBed` を再構成しないでください。

`createComponent` メソッドは、現在の `TestBed` 定義を凍結し、さらなる構成を締め切ります。

`configureTestingModule()` や `get()`、`override...` メソッドなど、`TestBed` の構成メソッドをさらに呼び出すことはできません。
呼び出そうとすると、`TestBed` はエラーをスローします。

### `ComponentFixture`

[ComponentFixture](api/core/testing/ComponentFixture) は、作成されたコンポーネントとその対応する要素を操作するためのテストハーネスです。

fixture を介してコンポーネントインスタンスにアクセスし、Jasmine の期待を使用して存在を確認します。

<docs-code path="adev/src/content/examples/testing/src/app/banner/banner-initial.component.spec.ts" visibleRegion="componentInstance"/>

### `beforeEach()`

このコンポーネントが進化するにつれて、さらに多くのテストを追加するでしょう。
各テストのために `TestBed` 構成を複製するのではなく、セットアップを Jasmine の `beforeEach()` といくつかのサポート変数にリファクタリングします。

<docs-code path="adev/src/content/examples/testing/src/app/banner/banner-initial.component.spec.ts" visibleRegion="v3"/>

次に、fixture.nativeElement からコンポーネントの要素を取得し、期待されるテキストを探すテストを追加します。

<docs-code path="adev/src/content/examples/testing/src/app/banner/banner-initial.component.spec.ts" visibleRegion="v4-test-2"/>

### `nativeElement`

`ComponentFixture.nativeElement` の値は `any` 型です。
後で `DebugElement.nativeElement` に遭遇しますが、これも `any` 型です。

Angular は、コンパイル時に `nativeElement` がどのような HTML 要素であるか、あるいは HTML 要素であるかどうかすらを知ることができません。
アプリケーションは、サーバーや [Web Worker](https://developer.mozilla.org/docs/Web/API/Web_Workers_API) などの _非ブラウザープラットフォーム_ で実行されている可能性があり、その場合、要素の API が制限されているか、存在しない可能性があります。

このガイドのテストはブラウザで実行されるように設計されているため、`nativeElement` の値は常に `HTMLElement` またはその派生クラスのいずれかになります。

それが何らかの `HTMLElement` であることを知っているので、標準の HTML `querySelector` を使用して、要素ツリーをさらに深く掘り下げます。

次に、`HTMLElement.querySelector` を呼び出して段落要素を取得し、バナーテキストを探すテストを示します。

<docs-code path="adev/src/content/examples/testing/src/app/banner/banner-initial.component.spec.ts" visibleRegion="v4-test-3"/>

### `DebugElement`

Angular の _fixture_ は、`fixture.nativeElement` を介してコンポーネントの要素を直接提供します。

<docs-code path="adev/src/content/examples/testing/src/app/banner/banner-initial.component.spec.ts" visibleRegion="nativeElement"/>

これは実際には、`fixture.debugElement.nativeElement` として実装された便利なメソッドです。

<docs-code path="adev/src/content/examples/testing/src/app/banner/banner-initial.component.spec.ts" visibleRegion="debugElement-nativeElement"/>

この回りくどい要素へのパスには、正当な理由があります。

`nativeElement` のプロパティは、実行時環境によって異なります。
これらのテストは、DOM がないか、DOM エミュレーションが完全な `HTMLElement` API をサポートしていない _非ブラウザープラットフォーム_ で実行されている可能性があります。

Angular は、_すべてのサポートされているプラットフォーム_ で安全に動作するために、`DebugElement` 抽象化に依存しています。
Angular は HTML 要素ツリーを作成するのではなく、実行時プラットフォームの _ネイティブ要素_ をラップする `DebugElement` ツリーを作成します。
`nativeElement` プロパティは `DebugElement` をラップ解除し、プラットフォーム固有の要素オブジェクトを返します。

このガイドのサンプルテストはブラウザでのみ実行されるように設計されているため、これらのテストの `nativeElement` は常に `HTMLElement` であり、そのおなじみのメソッドとプロパティはテスト内で調べることができます。

次に、`fixture.debugElement.nativeElement` を使用して再実装された前のテストを示します。

<docs-code path="adev/src/content/examples/testing/src/app/banner/banner-initial.component.spec.ts" visibleRegion="v4-test-4"/>

`DebugElement` には、このガイドの他の場所で説明されているように、テストで役立つ他のメソッドとプロパティがあります。

Angular コアライブラリから `DebugElement` シンボルをインポートします。

<docs-code path="adev/src/content/examples/testing/src/app/banner/banner-initial.component.spec.ts" visibleRegion="import-debug-element"/>

### `By.css()`

このガイドのテストはすべてブラウザで実行されますが、一部のアプリケーションは少なくとも一部の時間を別のプラットフォームで実行することがあります。

たとえば、コンポーネントは、接続の悪いデバイスでのアプリケーションの起動を高速化するための戦略の一部として、最初にサーバーでレンダリングされる可能性があります。
サーバー側レンダラーは、完全な HTML 要素 API をサポートしていない可能性があります。
`querySelector` をサポートしていない場合、前のテストは失敗する可能性があります。

`DebugElement` は、すべてのサポートされているプラットフォームで動作するクエリメソッドを提供します。
これらのクエリメソッドは、`DebugElement` ツリー内のノードが選択基準に一致した場合に `true` を返す _述語_ 関数を取ります。

実行時プラットフォームのライブラリからインポートされた `By` クラスの助けを借りて _述語_ を作成します。
次に、ブラウザプラットフォームの `By` のインポートを示します。

<docs-code path="adev/src/content/examples/testing/src/app/banner/banner-initial.component.spec.ts" visibleRegion="import-by"/>

次の例は、`DebugElement.query()` とブラウザの `By.css` メソッドを使用して、前のテストを再実装したものです。

<docs-code path="adev/src/content/examples/testing/src/app/banner/banner-initial.component.spec.ts" visibleRegion="v4-test-5"/>

注目すべき観察結果をいくつか紹介します。

- `By.css()` 静的メソッドは、[標準の CSS セレクター](https://developer.mozilla.org/docs/Learn/CSS/Building_blocks/Selectors "CSS セレクター") を持つ `DebugElement` ノードを選択します。
- クエリは、段落の `DebugElement` を返します。
- その結果をラップ解除して、段落要素を取得する必要があります。

CSS セレクターでフィルタリングし、ブラウザの _ネイティブ要素_ のプロパティのみをテストする場合は、`By.css` アプローチはやり過ぎになる可能性があります。

多くの場合、`querySelector()` や `querySelectorAll()` などの標準の `HTMLElement` メソッドを使用してフィルタリングする方が簡単で明確です。

# コンポーネントテストシナリオ

このガイドでは、一般的なコンポーネントテストのユースケースについて説明します。

## コンポーネントバインディング

サンプルアプリケーションでは、`BannerComponent`は HTML テンプレートに静的なタイトルテキストを表示します。

いくつかの変更を加えた後、`BannerComponent`は、次のようにコンポーネントの`title`プロパティにバインドすることで動的なタイトルを表示します。

<docs-code header="app/banner/banner.component.ts" path="adev/src/content/examples/testing/src/app/banner/banner.component.ts" visibleRegion="component"/>

これは最小限のものですが、コンポーネントが実際に期待どおりに正しいコンテンツを表示していることを確認するためのテストを追加することにします。

### `<h1>`のクエリ

*タイトル*プロパティの補間バインディングを囲む`<h1>`要素の値を検査する一連のテストを作成します。

`beforeEach`を更新して、標準の HTML`querySelector`でその要素を見つけ、`h1`変数に割り当てます。

<docs-code header="app/banner/banner.component.spec.ts (setup)" path="adev/src/content/examples/testing/src/app/banner/banner.component.spec.ts" visibleRegion="setup"/>

### `createComponent()`はデータをバインドしません

最初のテストでは、画面にデフォルトの`title`が表示されることを確認したいと考えています。
直感的には、次のように`<h1>`をすぐに検査するテストを作成するでしょう。

<docs-code path="adev/src/content/examples/testing/src/app/banner/banner.component.spec.ts" visibleRegion="expect-h1-default-v1"/>

_このテストは失敗します_、メッセージは次のとおりです。

<docs-code language="javascript">

expected '' to contain 'Test Tour of Heroes'.

</docs-code>

バインディングは、Angular が**変更検知**を実行したときに発生します。

本番環境では、Angular がコンポーネントを作成したり、ユーザーがキーストロークを入力したりしたときに、変更検知は自動的に開始されます。

`TestBed.createComponent`はデフォルトで変更検知をトリガーしません。これは、修正されたテストで確認できます。

<docs-code path="adev/src/content/examples/testing/src/app/banner/banner.component.spec.ts" visibleRegion="test-w-o-detect-changes"/>

### `detectChanges()`

`TestBed`に`fixture.detectChanges()`を呼び出してデータバインディングを実行するように指示することができます。
そうすれば初めて、`<h1>`に期待どおりのタイトルが表示されます。

<docs-code path="adev/src/content/examples/testing/src/app/banner/banner.component.spec.ts" visibleRegion="expect-h1-default"/>

変更検知が遅延されるのは意図的なことであり、便利です。
これにより、テスターは Angular がデータバインディングを開始し、[ライフサイクルフック](guide/components/lifecycle)を呼び出す*前に*、コンポーネントの状態を検査および変更することができます。

次に、`fixture.detectChanges()`を呼び出す*前に*、コンポーネントの`title`プロパティを変更するテストを示します。

<docs-code path="adev/src/content/examples/testing/src/app/banner/banner.component.spec.ts" visibleRegion="after-change"/>

### 自動変更検知

`BannerComponent`のテストでは、頻繁に`detectChanges`を呼び出しています。
多くのテスターは、Angular のテスト環境が本番環境のように自動的に変更検知を実行することを好みます。

これは、`TestBed`を`ComponentFixtureAutoDetect`プロバイダーで設定することで可能です。
まず、テストユーティリティライブラリからインポートします。

<docs-code header="app/banner/banner.component.detect-changes.spec.ts (import)" path="adev/src/content/examples/testing/src/app/banner/banner.component.detect-changes.spec.ts" visibleRegion="import-ComponentFixtureAutoDetect"/>

次に、テストモジュール設定の`providers`配列に追加します。

<docs-code header="app/banner/banner.component.detect-changes.spec.ts (AutoDetect)" path="adev/src/content/examples/testing/src/app/banner/banner.component.detect-changes.spec.ts" visibleRegion="auto-detect"/>

HELPFUL: `fixture.autoDetectChanges()`関数を代わりに使用することもできます。
これは、フィクスチャのコンポーネントの状態を更新した後、自動変更検知を有効にする場合のみです。
また、自動変更検知は`provideExperimentalZonelessChangeDetection`を使用する場合、デフォルトで有効になっており、オフにすることは推奨されません。

次に、自動変更検知がどのように機能するかを示す 3 つのテストを示します。

<docs-code header="app/banner/banner.component.detect-changes.spec.ts (AutoDetect Tests)" path="adev/src/content/examples/testing/src/app/banner/banner.component.detect-changes.spec.ts" visibleRegion="auto-detect-tests"/>

最初のテストは、自動変更検知の利点を示しています。

2 番目と 3 番目のテストは、重要な制限を明らかにしています。
Angular のテスト環境は、コンポーネントの`title`を変更したテストケース内で更新が行われた場合、変更検知を同期的に実行しません。
テストは、別の変更検知を待つために`await fixture.whenStable`を呼び出す必要があります。

HELPFUL: Angular は、信号ではない値への直接的な更新については知りません。
変更検知がスケジュールされるようにするための最も簡単な方法は、テンプレートで読み取られる値に信号を使用することです。

### `dispatchEvent()`を使用して入力値を変更する

ユーザー入力をシミュレートするには、入力要素を見つけ、その`value`プロパティを設定します。

しかし、重要な中間ステップがあります。

Angular は、入力要素の`value`プロパティを設定したことを知りません。
`dispatchEvent()`を呼び出して要素の`input`イベントを発生させるまで、そのプロパティを読み込みません。

次の例は、正しいシーケンスを示しています。

<docs-code header="app/hero/hero-detail.component.spec.ts (pipe test)" path="adev/src/content/examples/testing/src/app/hero/hero-detail.component.spec.ts" visibleRegion="title-case-pipe"/>

## 外部ファイルを持つコンポーネント

前の`BannerComponent`は、それぞれ`@Component.template`と`@Component.styles`プロパティで指定された*インラインテンプレート*と*インライン css*で定義されています。

多くのコンポーネントは、それぞれ`@Component.templateUrl`と`@Component.styleUrls`プロパティで、*外部テンプレート*と*外部 css*を指定します。`BannerComponent`の次のバリアントは、そのようにします。

<docs-code header="app/banner/banner-external.component.ts (metadata)" path="adev/src/content/examples/testing/src/app/banner/banner-external.component.ts" visibleRegion="metadata"/>

この構文は、Angular コンパイラーに、コンポーネントのコンパイル中に外部ファイルを読み取るように指示します。

これは、CLI`ng test`コマンドを実行するときに問題になりません。なぜなら、CLI は*テストを実行する前にアプリケーションをコンパイルする*からです。

しかし、**CLI 以外の環境**でテストを実行する場合、このコンポーネントのテストは失敗する可能性があります。
たとえば、[plunker](https://plnkr.co)などの Web コーディング環境で`BannerComponent`のテストを実行すると、次のようなメッセージが表示されます。

<docs-code hideCopy language="shell">

Error: This test module uses the component BannerComponent
which is using a "templateUrl" or "styleUrls", but they were never compiled.
Please call "TestBed.compileComponents" before your test.

</docs-code>

このテストエラーメッセージは、ランタイム環境が*テスト自体の実行中に*ソースコードをコンパイルするときに発生します。

この問題を解決するには、次の[compileComponents の呼び出し](#calling-compilecomponents)セクションで説明されているように、`compileComponents()`を呼び出します。

## 依存関係を持つコンポーネント

コンポーネントは、多くの場合、サービス依存関係を持ちます。

`WelcomeComponent`は、ログインしたユーザーに歓迎メッセージを表示します。
これは、注入された`UserService`のプロパティに基づいて、ユーザーが誰かを知っています。

<docs-code header="app/welcome/welcome.component.ts" path="adev/src/content/examples/testing/src/app/welcome/welcome.component.ts"/>

`WelcomeComponent`には、サービスと対話する意思決定ロジックがあり、このコンポーネントのテスト価値を高めています。

### サービステストダブルを提供する

*テスト対象のコンポーネント*は、実際のサービスを提供する必要はありません。

実際の`UserService`を注入するのは難しい場合があります。
実際のサービスは、ユーザーにログイン資格情報の入力を求めて、認証サーバーにアクセスしようとするかもしれません。
これらの動作は、インターセプトするのが難しい場合があります。テストダブルを使用すると、テストが本番環境とは異なる動作をするため、控えめに使用してください。

### 注入されたサービスを取得する

テストでは、`WelcomeComponent`に注入された`UserService`にアクセスする必要があります。

Angular には、階層的な注入システムがあります。
`TestBed`によって作成されたルートインジェクターから、コンポーネントツリーを下って、複数のレベルにインジェクターが存在する可能性があります。

注入されたサービスを取得する最も安全な方法は、*常に動作する*方法であり、
*テスト対象のコンポーネント*のインジェクターから取得することです。
コンポーネントインジェクターは、フィクスチャの`DebugElement`のプロパティです。

<docs-code header="WelcomeComponent's injector" path="adev/src/content/examples/testing/src/app/welcome/welcome.component.spec.ts" visibleRegion="injected-service"/>

HELPFUL: これは*通常*は必要ありません。サービスは、多くの場合、ルートまたは`TestBed`のオーバーライドで提供され、`TestBed.inject()`を使用してより簡単に取得できます（下記参照）。

### `TestBed.inject()`

これは、フィクスチャの`DebugElement`を使用してサービスを取得するよりも覚えやすく、冗長性が少なくなります。

このテストスイートでは、`UserService`のプロバイダーはルートテストモジュールのみであるため、次のように`TestBed.inject()`を呼び出すのは安全です。

<docs-code header="TestBed injector" path="adev/src/content/examples/testing/src/app/welcome/welcome.component.spec.ts" visibleRegion="inject-from-testbed" />

HELPFUL: `TestBed.inject()`が機能しないユースケースについては、[_コンポーネントプロバイダーのオーバーライド_](#override-component-providers)セクションを参照してください。このセクションでは、いつ、なぜフィクスチャのインジェクターの代わりにコンポーネントのインジェクターからサービスを取得する必要があるのかを説明しています。

### 最終的な設定とテスト

次に、`TestBed.inject()`を使用した完全な`beforeEach()`を示します。

<docs-code header="app/welcome/welcome.component.spec.ts" path="adev/src/content/examples/testing/src/app/welcome/welcome.component.spec.ts" visibleRegion="setup"/>

次に、いくつかのテストを示します。

<docs-code header="app/welcome/welcome.component.spec.ts" path="adev/src/content/examples/testing/src/app/welcome/welcome.component.spec.ts" visibleRegion="tests"/>

最初のテストは、健全性テストです。これは、`UserService`が呼び出され、機能していることを確認します。

HELPFUL: withContext 関数（たとえば、`'expected name'`）は、オプションの失敗ラベルです。
期待値が失敗した場合、Jasmine は期待値の失敗メッセージにこのラベルを追加します。
複数の期待値を持つスペックでは、何が間違っていたのか、どの期待値が失敗したのかを明確にするのに役立ちます。

残りのテストは、サービスが異なる値を返した場合に、コンポーネントのロジックが正しいことを確認します。
2 番目のテストは、ユーザー名の変更の効果を検証します。
3 番目のテストは、ログインしたユーザーがいない場合に、コンポーネントが適切なメッセージを表示することを確認します。

## 非同期サービスを持つコンポーネント

このサンプルでは、`AboutComponent`テンプレートは`TwainComponent`をホストしています。
`TwainComponent`は、マーク・トウェインの引用を表示します。

<docs-code header="app/twain/twain.component.ts (template)" path="adev/src/content/examples/testing/src/app/twain/twain.component.ts" visibleRegion="template" />

HELPFUL: コンポーネントの`quote`プロパティの値は、`AsyncPipe`を通過します。
つまり、プロパティは`Promise`または`Observable`のいずれかを返します。

この例では、`TwainComponent.getQuote()`メソッドは、`quote`プロパティが`Observable`を返すと伝えています。

<docs-code header="app/twain/twain.component.ts (getQuote)" path="adev/src/content/examples/testing/src/app/twain/twain.component.ts" visibleRegion="get-quote"/>

`TwainComponent`は、注入された`TwainService`から引用を取得します。
コンポーネントは、サービスが最初の引用を返す前に、プレースホルダー値（`'...'`）で返された`Observable`を開始します。

`catchError`はサービスエラーをインターセプトし、エラーメッセージを準備し、成功チャネルでプレースホルダー値を返します。

これらはすべて、テストしたい機能です。

### スパイによるテスト

コンポーネントをテストする場合は、サービスのパブリック API のみが問題になります。
一般的に、テスト自体がリモートサーバーへの呼び出しを行わないようにする必要があります。
そのような呼び出しをエミュレートする必要があります。
この`app/twain/twain.component.spec.ts`のセットアップは、その方法の 1 つを示しています。

<docs-code header="app/twain/twain.component.spec.ts (setup)" path="adev/src/content/examples/testing/src/app/twain/twain.component.spec.ts" visibleRegion="setup"/>

スパイに注目してください。

<docs-code path="adev/src/content/examples/testing/src/app/twain/twain.component.spec.ts" visibleRegion="spy"/>

スパイは、`getQuote`への呼び出しが、テスト引用を含む Observable を受け取るように設計されています。
実際の`getQuote()`メソッドとは異なり、このスパイはサーバーをバイパスし、値がすぐに利用可能な同期 Observable を返します。

このスパイを使用すると、`Observable`が同期的なものであっても、多くの役立つテストを作成できます。

HELPFUL: スパイの使用は、テストに必要なものに限定するのが最善です。必要なもの以上のモックやスパイを作成すると、壊れやすくなる可能性があります。コンポーネントとインジェクタブルが進化するにつれて、関連のないテストは、それ以外ではテストに影響を与えないのに十分な動作をモックしなくなったために失敗する可能性があります。

### `fakeAsync()`による非同期テスト

`fakeAsync()`機能を使用するには、テストセットアップファイルに`zone.js/testing`をインポートする必要があります。
Angular CLI でプロジェクトを作成した場合、`zone-testing`はすでに`src/test.ts`にインポートされています。

次のテストは、サービスが`ErrorObservable`を返した場合に期待される動作を確認します。

<docs-code path="adev/src/content/examples/testing/src/app/twain/twain.component.spec.ts" visibleRegion="error-test"/>

HELPFUL: `it()`関数は、次の形式の引数を受け取ります。

<docs-code language="javascript">

fakeAsync(() => { /_test body_/ })

</docs-code>

`fakeAsync()`関数は、特別な`fakeAsync test zone`でテスト本体を実行することで、線形のコーディングスタイルを可能にします。
テスト本体は同期的に見えるようになります。
制御フローを妨げるネストされた構文（`Promise.then()`など）はありません。

HELPFUL: 制限事項: `fakeAsync()`関数は、テスト本体が`XMLHttpRequest`（XHR）呼び出しをすると機能しません。
テスト内の XHR 呼び出しはまれですが、XHR を呼び出す必要がある場合は、[`waitForAsync()`](#waitForAsync)セクションを参照してください。

IMPORTANT: `fakeAsync`ゾーン内で発生する非同期タスクは、`flush`または`tick`を使用して手動で実行する必要があることに注意してください。
`fakeAsync`テストヘルパーを使用して時間を進めずに、完了するまで待つと（つまり、`fixture.whenStable`を使用）、テストは失敗する可能性が高いです。
詳細については、以下を参照してください。

### `tick()`関数

[tick()](api/core/testing/tick)を呼び出して、仮想クロックを進める必要があります。

[tick()](api/core/testing/tick)を呼び出すと、保留中の非同期アクティビティがすべて完了するまで、仮想クロックが前進します。
この場合、Observable の`setTimeout()`を待ちます。

[tick()](api/core/testing/tick)関数は、`millis`と`tickOptions`をパラメーターとして受け取ります。`millis`パラメーターは、仮想クロックがどれだけ進むかを指定し、指定されていない場合はデフォルトで`0`になります。
たとえば、`fakeAsync()`テストに`setTimeout(fn, 100)`がある場合、`fn`のコールバックをトリガーするには、`tick(100)`を使用する必要があります。
オプションの`tickOptions`パラメーターには、`processNewMacroTasksSynchronously`という名前のプロパティがあります。`processNewMacroTasksSynchronously`プロパティは、ティック時に新しい生成されたマクロタスクを呼び出すかどうかを表し、デフォルトでは`true`です。

<docs-code path="adev/src/content/examples/testing/src/app/demo/async-helper.spec.ts" visibleRegion="fake-async-test-tick"/>

[tick()](api/core/testing/tick)関数は、`TestBed`でインポートする Angular のテストユーティリティの 1 つです。
これは`fakeAsync()`の仲間であり、`fakeAsync()`本体内でのみ呼び出すことができます。

### tickOptions

この例では、ネストされた`setTimeout`関数が新しいマクロタスクです。デフォルトでは、`tick`が setTimeout の場合、`outside`と`nested`の両方がトリガーされます。

<docs-code path="adev/src/content/examples/testing/src/app/demo/async-helper.spec.ts" visibleRegion="fake-async-test-tick-new-macro-task-sync"/>

場合によっては、ティック時に新しいマクロタスクをトリガーしたくない場合があります。`tick(millis, {processNewMacroTasksSynchronously: false})`を使用して、新しいマクロタスクを呼び出さないようにすることができます。

<docs-code path="adev/src/content/examples/testing/src/app/demo/async-helper.spec.ts" visibleRegion="fake-async-test-tick-new-macro-task-async"/>

### `fakeAsync()`内の日付の比較

`fakeAsync()`は時間の経過をシミュレートするため、`fakeAsync()`内で日付の差を計算することができます。

<docs-code path="adev/src/content/examples/testing/src/app/demo/async-helper.spec.ts" visibleRegion="fake-async-test-date"/>

### `jasmine.clock`と`fakeAsync()`

Jasmine は、日付をモックするための`clock`機能も提供しています。
Angular は、`jasmine.clock().install()`が`fakeAsync()`メソッド内で呼び出された後、`jasmine.clock().uninstall()`が呼び出されるまで実行されるテストを自動的に実行します。
`fakeAsync()`は必要なく、ネストされている場合はエラーをスローします。

デフォルトでは、この機能はオフになっています。
有効にするには、`zone-testing`をインポートする前にグローバルフラグを設定します。

Angular CLI を使用している場合は、`src/test.ts`でこのフラグを設定します。

<docs-code language="typescript">

[window as any]('__zone_symbol__fakeAsyncPatchLock') = true;
import 'zone.js/testing';

</docs-code>

<docs-code path="adev/src/content/examples/testing/src/app/demo/async-helper.spec.ts" visibleRegion="fake-async-test-clock"/>

### `fakeAsync()`内の RxJS スケジューラーの使用

`setTimeout()`や`setInterval()`と同様に、`fakeAsync()`で RxJS スケジューラーを使用することもできますが、RxJS スケジューラーをパッチするために`zone.js/plugins/zone-patch-rxjs-fake-async`をインポートする必要があります。

<docs-code path="adev/src/content/examples/testing/src/app/demo/async-helper.spec.ts" visibleRegion="fake-async-test-rxjs"/>

### より多くの macroTasks をサポートする

デフォルトでは、`fakeAsync()`は次の macroTasks をサポートしています。

- `setTimeout`
- `setInterval`
- `requestAnimationFrame`
- `webkitRequestAnimationFrame`
- `mozRequestAnimationFrame`

`HTMLCanvasElement.toBlob()`などの他の macroTasks を実行すると、「fake async test で不明な macroTask がスケジュールされました」というエラーがスローされます。

<docs-code-multifile>
    <docs-code header="src/app/shared/canvas.component.spec.ts (failing)" path="adev/src/content/examples/testing/src/app/shared/canvas.component.spec.ts" visibleRegion="without-toBlob-macrotask"/>
    <docs-code header="src/app/shared/canvas.component.ts" path="adev/src/content/examples/testing/src/app/shared/canvas.component.ts" visibleRegion="main"/>
</docs-code-multifile>

このような場合をサポートしたい場合は、サポートする macroTasks を`beforeEach()`で定義する必要があります。
たとえば、次のようになります。

<docs-code header="src/app/shared/canvas.component.spec.ts (excerpt)" path="adev/src/content/examples/testing/src/app/shared/canvas.component.spec.ts" visibleRegion="enable-toBlob-macrotask"/>

HELPFUL: アプリで`<canvas>`要素を Zone.js 対応にするには、`zone-patch-canvas`パッチをインポートする必要があります（`polyfills.ts`または`<canvas>`を使用する特定のファイルにインポートします）。

<docs-code header="src/polyfills.ts or src/app/shared/canvas.component.ts" path="adev/src/content/examples/testing/src/app/shared/canvas.component.ts" visibleRegion="import-canvas-patch"/>

### 非同期 Observable

これらのテストのテストカバレッジに満足しているかもしれません。

しかし、実際のサービスが完全にこのようには動作していないという事実で悩んでいるかもしれません。
実際のサービスは、リモートサーバーにリクエストを送信します。
サーバーは応答するまでに時間がかかり、応答は前の 2 つのテストのようにすぐに利用できるわけではありません。

テストでは、次のように`getQuote()`スパイから*非同期*Observable を返すと、現実の世界をより忠実に反映することができます。

<docs-code path="adev/src/content/examples/testing/src/app/twain/twain.component.spec.ts" visibleRegion="async-setup"/>

### 非同期 Observable のヘルパー

非同期 Observable は、`asyncData`ヘルパーによって生成されました。
`asyncData`ヘルパーは、自分で記述するか、サンプルコードからこのヘルパーをコピーする必要があるユーティリティ関数です。

<docs-code header="testing/async-observable-helpers.ts" path="adev/src/content/examples/testing/src/testing/async-observable-helpers.ts" visibleRegion="async-data"/>

このヘルパーの Observable は、JavaScript エンジンの次のターンで`data`値を発行します。

[RxJS `defer()`演算子](http://reactivex.io/documentation/operators/defer.html)は、Observable を返します。
これは、`Promise`または`Observable`のいずれかを返すファクトリ関数を取得します。
何かが*defer*の Observable を購読すると、そのファクトリで作成された新しい Observable に購読者を追加します。

`defer()`演算子は、`Promise.resolve()`を、`HttpClient`のように一度発行して完了する新しい Observable に変換します。
購読者は、`data`値を受け取ると購読解除されます。

非同期エラーを生成するための同様のヘルパーがあります。

<docs-code path="adev/src/content/examples/testing/src/testing/async-observable-helpers.ts" visibleRegion="async-error"/>

### さらなる非同期テスト

`getQuote()`スパイが非同期 Observable を返すようになったので、ほとんどのテストも非同期にする必要があります。

次に、現実の世界で期待されるデータフローを示す`fakeAsync()`テストを示します。

<docs-code path="adev/src/content/examples/testing/src/app/twain/twain.component.spec.ts" visibleRegion="fake-async-test"/>

引用要素には、`ngOnInit()`の後、プレースホルダー値（`'...'`）が表示されます。
まだ最初の引用は届いていません。

Observable から最初の引用をフラッシュするには、[tick()](api/core/testing/tick)を呼び出します。
次に、`detectChanges()`を呼び出して、Angular に画面を更新するように指示します。

その後、引用要素に期待どおりのテキストが表示されていることをアサートできます。

### `fakeAsync()`を使わない非同期テスト

次に、前の`fakeAsync()`テストを`async`で書き直したものを示します。

<docs-code path="adev/src/content/examples/testing/src/app/twain/twain.component.spec.ts" visibleRegion="async-test"/>

### `whenStable`

テストは、`getQuote()`Observable が次の引用を発行するまで待つ必要があります。
[tick()](api/core/testing/tick)を呼び出す代わりに、`fixture.whenStable()`を呼び出します。

`fixture.whenStable()`は、JavaScript エンジンのタスクキューが空になったときに解決されるプロミスを返します。
この例では、タスクキューは Observable が最初の引用を発行したときに空になります。

## 入力と出力を持つコンポーネント

入力と出力を持つコンポーネントは、通常、ホストコンポーネントのビューテンプレート内に表示されます。
ホストは、プロパティバインディングを使用して入力プロパティを設定し、イベントバインディングを使用して出力プロパティによって発生したイベントをリスンします。

テストの目標は、そのようなバインディングが期待どおりに機能することを確認することです。
テストでは、入力値を設定し、出力イベントをリスンする必要があります。

`DashboardHeroComponent`は、この役割を果たすコンポーネントの小さな例です。
これは、`DashboardComponent`によって提供された個々のヒーローを表示します。
そのヒーローをクリックすると、`DashboardComponent`にユーザーがヒーローを選択したことを伝えます。

`DashboardHeroComponent`は、次のように`DashboardComponent`テンプレートに埋め込まれています。

<docs-code header="app/dashboard/dashboard.component.html (excerpt)" path="adev/src/content/examples/testing/src/app/dashboard/dashboard.component.html" visibleRegion="dashboard-hero"/>

`DashboardHeroComponent`は`*ngFor`リピーター内に表示され、各コンポーネントの`hero`入力プロパティはループする値に設定され、コンポーネントの`selected`イベントをリスンします。

コンポーネントの完全な定義を次に示します。

<docs-code header="app/dashboard/dashboard-hero.component.ts (component)" path="adev/src/content/examples/testing/src/app/dashboard/dashboard-hero.component.ts" visibleRegion="component"/>

この単純なコンポーネントをテストすることは、ほとんど内在的な価値はありませんが、テスト方法を知る価値はあります。
次のいずれかの方法を使用します。

- `DashboardComponent`で使用されているようにテストする
- スタンドアロンコンポーネントとしてテストする
- `DashboardComponent`の代替として使用されているようにテストする

当面の目標は、`DashboardComponent`ではなく`DashboardHeroComponent`をテストすることなので、2 番目と 3 番目のオプションを試してみましょう。

### `DashboardHeroComponent`をスタンドアロンでテストする

スペックファイルの設定の重要な部分を次に示します。

<docs-code header="app/dashboard/dashboard-hero.component.spec.ts (setup)" path="adev/src/content/examples/testing/src/app/dashboard/dashboard-hero.component.spec.ts" visibleRegion="setup"/>

設定コードは、コンポーネントの`hero`プロパティにテストヒーロー（`expectedHero`）を割り当てています。これは、`DashboardComponent`がリピーターのプロパティバインディングを使用して設定する方法をエミュレートしています。

次のテストは、ヒーロー名がバインディングを使用してテンプレートに伝播されることを検証します。

<docs-code path="adev/src/content/examples/testing/src/app/dashboard/dashboard-hero.component.spec.ts" visibleRegion="name-test"/>

[テンプレート](#dashboard-hero-component)は、ヒーロー名を Angular の`UpperCasePipe`を通して渡すため、テストでは要素値を大文字の名前と照合する必要があります。

### クリック

ヒーローをクリックすると、ホストコンポーネント（`DashboardComponent`と推測される）が聞き取ることができる`selected`イベントが発生するはずです。

<docs-code path="adev/src/content/examples/testing/src/app/dashboard/dashboard-hero.component.spec.ts" visibleRegion="click-test"/>

コンポーネントの`selected`プロパティは、`EventEmitter`を返します。これは、消費者にとっては RxJS の同期`Observable`のように見えます。
テストは、ホストコンポーネントが*暗黙的に*行うように、*明示的に*これを購読します。

コンポーネントが期待どおりに動作すれば、ヒーローの要素をクリックすると、コンポーネントの`selected`プロパティに`hero`オブジェクトを発行するように指示されます。

テストは、`selected`への購読を通じてそのイベントを検出します。

### `triggerEventHandler`

前のテストの`heroDe`は、ヒーロー`<div>`を表す`DebugElement`です。

これは、ネイティブ要素との対話を抽象化する Angular のプロパティとメソッドを持っています。
このテストは、"click"イベント名で`DebugElement.triggerEventHandler`を呼び出します。
"click"イベントバインディングは、`DashboardHeroComponent.click()`を呼び出すことで応答します。

Angular の`DebugElement.triggerEventHandler`は、*イベント名*を使用して、*データバインドされたイベント*を発生させることができます。
2 番目のパラメーターは、ハンドラーに渡されるイベントオブジェクトです。

テストでは、"click"イベントをトリガーしました。

<docs-code path="adev/src/content/examples/testing/src/app/dashboard/dashboard-hero.component.spec.ts" visibleRegion="trigger-event-handler"/>

この場合、テストでは、ランタイムイベントハンドラーであるコンポーネントの`click()`メソッドがイベントオブジェクトを気にしないことを正しく想定しています。

HELPFUL: 他のハンドラーは、それほど寛容ではありません。
たとえば、`RouterLink`ディレクティブは、クリック時にどのマウスボタンが押されたかを識別する`button`プロパティを持つオブジェクトを期待しています。
`RouterLink`ディレクティブは、イベントオブジェクトが不足している場合、エラーをスローします。

### 要素をクリックする

次のテストの代替案は、ネイティブ要素自身の`click()`メソッドを呼び出します。これは、*このコンポーネント*には完全に適しています。

<docs-code path="adev/src/content/examples/testing/src/app/dashboard/dashboard-hero.component.spec.ts" visibleRegion="click-test-2"/>

### `click()`ヘルパー

ボタン、アンカー、または任意の HTML 要素をクリックすることは、一般的なテストタスクです。

次の`click()`関数のようなヘルパーに*クリックをトリガーする*プロセスをカプセル化することで、それを一貫性があり、簡単に行うことができます。

<docs-code header="testing/index.ts (click helper)" path="adev/src/content/examples/testing/src/testing/index.ts" visibleRegion="click-event"/>

最初の引数は、*クリックする要素*です。
必要に応じて、2 番目の引数としてカスタムイベントオブジェクトを渡すことができます。
デフォルトは、`RouterLink`ディレクティブを含む多くのハンドラーで受け入れられる、部分的な[左ボタンのマウスイベントオブジェクト](https://developer.mozilla.org/docs/Web/API/MouseEvent/button)です。

IMPORTANT: `click()`ヘルパー関数は、Angular のテストユーティリティの**1 つではありません**。
これは、*このガイドのサンプルコード*で定義された関数です。
サンプルテストはすべてこれを利用しています。
気に入ったら、自分のヘルパーのコレクションに追加してください。

次に、クリックヘルパーを使用した前のテストを示します。

<docs-code header="app/dashboard/dashboard-hero.component.spec.ts (test with click helper)" path="adev/src/content/examples/testing/src/app/dashboard/dashboard-hero.component.spec.ts" visibleRegion="click-test-3"/>

## テストホスト内のコンポーネント

前のテストは、ホスト`DashboardComponent`の役割を自身で演じていました。
しかし、`DashboardHeroComponent`は、ホストコンポーネントに適切にデータバインドされている場合、正しく動作するでしょうか？

<docs-code header="app/dashboard/dashboard-hero.component.spec.ts (test host)" path="adev/src/content/examples/testing/src/app/dashboard/dashboard-hero.component.spec.ts" visibleRegion="test-host"/>

テストホストは、コンポーネントの`hero`入力プロパティをテストヒーローで設定します。
これは、コンポーネントの`selected`イベントを`onSelected`ハンドラーにバインドし、これは`selectedHero`プロパティに発行されたヒーローを記録します。

後で、テストは`selectedHero`をチェックして、`DashboardHeroComponent.selected`イベントが期待どおりのヒーローを発行したことを確認できます。

`test-host`テストの設定は、スタンドアロンテストの設定に似ています。

<docs-code header="app/dashboard/dashboard-hero.component.spec.ts (test host setup)" path="adev/src/content/examples/testing/src/app/dashboard/dashboard-hero.component.spec.ts" visibleRegion="test-host-setup"/>

このテストモジュール設定は、3 つの重要な違いを示しています。

- `DashboardHeroComponent`と`TestHostComponent`の両方を*インポート*します
- `DashboardHeroComponent`ではなく`TestHostComponent`を*作成*します
- `TestHostComponent`は、バインディングで`DashboardHeroComponent.hero`を設定します

`createComponent`は、`DashboardHeroComponent`のインスタンスではなく、`TestHostComponent`のインスタンスを保持する`fixture`を返します。

`TestHostComponent`を作成すると、後者が前者のテンプレート内に表示されているため、`DashboardHeroComponent`が作成されます。
ヒーロー要素（`heroEl`）のクエリは、テスト DOM 内で見つかりますが、前のテストよりも要素ツリーの深さが大きくなります。

テスト自体は、スタンドアロンバージョンとほとんど同じです。

<docs-code header="app/dashboard/dashboard-hero.component.spec.ts (test-host)" path="adev/src/content/examples/testing/src/app/dashboard/dashboard-hero.component.spec.ts" visibleRegion="test-host-tests"/>

選択されたイベントテストのみが異なります。
これは、選択された`DashboardHeroComponent`のヒーローが、実際にイベントバインディングを通じてホストコンポーネントに到達することを確認します。

## ルーティングコンポーネント

*ルーティングコンポーネント*は、`Router`に別のコンポーネントにナビゲートするように指示するコンポーネントです。
`DashboardComponent`は、ユーザーがダッシュボードの*ヒーローボタン*の 1 つをクリックすることで`HeroDetailComponent`にナビゲートできるため、*ルーティングコンポーネント*です。

Angular は、`HttpClient`に依存するコードをより効果的にテストするために、テストヘルパーを提供しています。`provideRouter`関数はテストモジュール内でも直接使えます。

<docs-code header="app/dashboard/dashboard.component.spec.ts" path="adev/src/content/examples/testing/src/app/dashboard/dashboard.component.spec.ts" visibleRegion="router-harness"/>

次のテストは、表示されているヒーローをクリックし、期待される URL にナビゲートしたことを確認します。

<docs-code header="app/dashboard/dashboard.component.spec.ts (navigate test)" path="adev/src/content/examples/testing/src/app/dashboard/dashboard.component.spec.ts" visibleRegion="navigate-test"/>

## ルーティングされたコンポーネント

*ルーティングされたコンポーネント*は、`Router`ナビゲーションの宛先です。
特に、コンポーネントへのルートに*パラメーターが含まれている場合*、テストが難しくなる場合があります。
`HeroDetailComponent`は、このようなルートの宛先である*ルーティングされたコンポーネント*です。

ユーザーが*Dashboard*のヒーローをクリックすると、`DashboardComponent`は`Router`に`heroes/:id`にナビゲートするように指示します。
`:id`は、編集するヒーローの`id`であるルートパラメーターです。

`Router`は、その URL を`HeroDetailComponent`へのルートと照合します。
これは、ルーティング情報を持つ`ActivatedRoute`オブジェクトを作成し、`HeroDetailComponent`の新しいインスタンスに注入します。

`HeroDetailComponent`のコンストラクターを次に示します。

<docs-code header="app/hero/hero-detail.component.ts (constructor)" path="adev/src/content/examples/testing/src/app/hero/hero-detail.component.ts" visibleRegion="ctor"/>

`HeroDetail`コンポーネントは、`id`パラメーターが必要であり、これにより`HeroDetailService`を使用して対応するヒーローを取得できます。
コンポーネントは、`Observable`である`ActivatedRoute.paramMap`プロパティから`id`を取得する必要があります。

コンポーネントは、`ActivatedRoute.paramMap`の`id`プロパティを参照することはできません。
コンポーネントは、`ActivatedRoute.paramMap`Observable を*購読*し、ライフタイム中に`id`が変更される場合に備えておく必要があります。

<docs-code header="app/hero/hero-detail.component.ts (ngOnInit)" path="adev/src/content/examples/testing/src/app/hero/hero-detail.component.ts" visibleRegion="ng-on-init"/>

テストでは、異なるルートにナビゲートすることで、`HeroDetailComponent`が異なる`id`パラメーター値にどのように応答するかを調べることができます。

### `RouterTestingHarness`によるテスト

次に、観察された`id`が既存のヒーローを参照している場合に、コンポーネントの動作を示すテストを示します。

<docs-code header="app/hero/hero-detail.component.spec.ts (existing id)" path="adev/src/content/examples/testing/src/app/hero/hero-detail.component.spec.ts" visibleRegion="route-good-id"/>

HELPFUL: 後のセクションでは、`createComponent()`メソッドと`page`オブジェクトについて説明します。
今のところ、直感的に理解してください。

`id`が見つからない場合、コンポーネントは`HeroListComponent`にリダイレクトする必要があります。

テストスイートの設定では、同じルーターハーネスが提供されました[上記を参照](#routing-component)。

このテストは、コンポーネントが`HeroListComponent`へのナビゲーションを試みると予想しています。

<docs-code header="app/hero/hero-detail.component.spec.ts (bad id)" path="adev/src/content/examples/testing/src/app/hero/hero-detail.component.spec.ts" visibleRegion="route-bad-id"/>

## ネストされたコンポーネントテスト

コンポーネントテンプレートには、多くの場合、ネストされたコンポーネントが含まれています。そのテンプレートには、さらに多くのコンポーネントが含まれている場合があります。

コンポーネントツリーは非常に深くなる可能性があり、ネストされたコンポーネントはツリーの先頭に配置されたコンポーネントをテストする際に役割を果たさないことがあります。

たとえば、`AppComponent`は、アンカーと`RouterLink`ディレクティブを持つナビゲーションバーを表示します。

<docs-code header="app/app.component.html" path="adev/src/content/examples/testing/src/app/app.component.html"/>

ナビゲーションではなくリンクを検証するために、`Router`が*ルーティングされたコンポーネント*を挿入する場所を示す`<router-outlet>`も必要ありません。

`BannerComponent`と`WelcomeComponent`（`<app-banner>`と`<app-welcome>`で示されています）も関係ありません。

しかし、DOM に`AppComponent`を作成するテストは、これらの 3 つのコンポーネントのインスタンスも作成し、それを許可した場合、`TestBed`を設定してそれらを作成する必要があります。

それらを宣言することを怠ると、Angular コンパイラーは`AppComponent`テンプレートの`<app-banner>`、`<app-welcome>`、および`<router-outlet>`タグを認識せず、エラーをスローします。

実際のコンポーネントを宣言すると、*それら*のネストされたコンポーネントも宣言し、ツリー内の*任意の*コンポーネントに注入された*すべての*サービスを提供する必要があります。

このセクションでは、セットアップを最小限にするための 2 つのテクニックについて説明します。
これらを単独で、または組み合わせて使用して、主要なコンポーネントのテストに集中してください。

### 不要なコンポーネントのスタブ化

最初のテクニックでは、テストでほとんど役割を果たさないコンポーネントとディレクティブのスタブバージョンを作成して宣言します。

<docs-code header="app/app.component.spec.ts (stub declaration)" path="adev/src/content/examples/testing/src/app/app.component.spec.ts" visibleRegion="component-stubs"/>

スタブセレクターは、対応する実際のコンポーネントのセレクターと一致します。
しかし、それらのテンプレートとクラスは空です。

次に、`TestBed`設定内で、実際にする必要があるコンポーネント、ディレクティブ、パイプの横に宣言します。

<docs-code header="app/app.component.spec.ts (TestBed stubs)" path="adev/src/content/examples/testing/src/app/app.component.spec.ts" visibleRegion="testbed-stubs"/>

`AppComponent`はテスト対象なので、当然、実際のバージョンを宣言します。

残りはスタブです。

### `NO_ERRORS_SCHEMA`

2 番目の方法では、`TestBed.schemas`メタデータに`NO_ERRORS_SCHEMA`を追加します。

<docs-code header="app/app.component.spec.ts (NO_ERRORS_SCHEMA)" path="adev/src/content/examples/testing/src/app/app.component.spec.ts" visibleRegion="no-errors-schema"/>

`NO_ERRORS_SCHEMA`は、Angular コンパイラーに、認識されていない要素と属性を無視するように指示します。

コンパイラーは、`TestBed`設定で対応する`AppComponent`と`RouterLink`を宣言したため、`<app-root>`要素と`routerLink`属性を認識します。

しかし、コンパイラーは`<app-banner>`、`<app-welcome>`、または`<router-outlet>`に遭遇してもエラーをスローしません。
単にそれらを空のタグとしてレンダリングし、ブラウザはそれらを無視します。

スタブコンポーネントは不要になりました。

### 2 つのテクニックを組み合わせて使用する

これらは、*シャローコンポーネントテスト*のためのテクニックであり、コンポーネントの視覚的な表面を、テストにとって重要なコンポーネントのテンプレート内の要素だけに制限するため、そう呼ばれています。

`NO_ERRORS_SCHEMA`アプローチは 2 つのうちより簡単ですが、使い過ぎないでください。

`NO_ERRORS_SCHEMA`は、コンパイラーが意図的に省略した、または誤ってスペルミスをした、見逃したコンポーネントと属性について警告するのを防ぎます。
コンパイラーが瞬時に検出できたはずの幽霊バグを追いかけて何時間も無駄にする可能性があります。

*スタブコンポーネント*アプローチには、もう 1 つの利点があります。
*この*例ではスタブは空でしたが、テストでそれらと何らかの形で対話する必要がある場合は、縮小されたテンプレートとクラスを与えることができます。

実際には、次の例のように、2 つのテクニックを同じセットアップに組み合わせます。

<docs-code header="app/app.component.spec.ts (mixed setup)" path="adev/src/content/examples/testing/src/app/app.component.spec.ts" visibleRegion="mixed-setup"/>

Angular コンパイラーは、`<app-banner>`要素に対して`BannerStubComponent`を作成し、`routerLink`属性を持つアンカーに`RouterLink`を適用しますが、`<app-welcome>`と`<router-outlet>`タグは無視します。

### `By.directive`と注入されたディレクティブ

さらに少しセットアップすると、初期データバインディングがトリガーされ、ナビゲーションリンクへの参照が取得されます。

<docs-code header="app/app.component.spec.ts (test setup)" path="adev/src/content/examples/testing/src/app/app.component.spec.ts" visibleRegion="test-setup"/>

3 つの重要なポイントを次に示します。

- `By.directive`を使用して、アタッチされたディレクティブを持つアンカー要素を見つけます
- クエリは、一致する要素をラップする`DebugElement`ラッパーを返します
- 各`DebugElement`は、その要素にアタッチされたディレクティブの特定のインスタンスを含む依存関係インジェクターを公開します

`AppComponent`が検証するリンクは次のとおりです。

<docs-code header="app/app.component.html (navigation links)" path="adev/src/content/examples/testing/src/app/app.component.html" visibleRegion="links"/>

次に、これらのリンクが期待どおりに`routerLink`ディレクティブに配線されていることを確認するテストを示します。

<docs-code header="app/app.component.spec.ts (selected tests)" path="adev/src/content/examples/testing/src/app/app.component.spec.ts" visibleRegion="tests"/>

## `page`オブジェクトの使用

`HeroDetailComponent`は、タイトル、2 つのヒーローフィールド、2 つのボタンを持つ単純なビューです。

しかし、この単純な形式でも、テンプレートの複雑さはたくさんあります。

<docs-code
  path="adev/src/content/examples/testing/src/app/hero/hero-detail.component.html" header="app/hero/hero-detail.component.html"/>

コンポーネントをテストするものは、…

- ヒーローが到着するまで待つ必要がある
- タイトルテキストへの参照
- 検査および設定するための名前入力ボックスへの参照
- クリックできる 2 つのボタンへの参照

このような小さなフォームでも、むち打ちの条件付きセットアップと CSS 要素の選択の混乱を招く可能性があります。

コンポーネントのプロパティへのアクセスを処理し、それらを設定するロジックをカプセル化する`Page`クラスを使用して、複雑さを抑制します。

次に、`hero-detail.component.spec.ts`の`Page`クラスを示します。

<docs-code header="app/hero/hero-detail.component.spec.ts (Page)" path="adev/src/content/examples/testing/src/app/hero/hero-detail.component.spec.ts" visibleRegion="page"/>

これで、コンポーネントの操作と検査のための重要なフックが、整理され、`Page`のインスタンスからアクセスできるようになりました。

`createComponent`メソッドは、`page`オブジェクトを作成し、`hero`が到着すると空白を埋めます。

<docs-code header="app/hero/hero-detail.component.spec.ts (createComponent)" path="adev/src/content/examples/testing/src/app/hero/hero-detail.component.spec.ts" visibleRegion="create-component"/>

次に、ポイントを強化するための`HeroDetailComponent`のテストをいくつか示します。

<docs-code header="app/hero/hero-detail.component.spec.ts (selected tests)" path="adev/src/content/examples/testing/src/app/hero/hero-detail.component.spec.ts" visibleRegion="selected-tests"/>

## `compileComponents()`の呼び出し

HELPFUL: CLI`ng test`コマンドでのみテストを実行している場合は、このセクションを無視してください。なぜなら、CLI はテストを実行する前にアプリケーションをコンパイルするからです。

**CLI 以外の環境**でテストを実行する場合、テストは次のようなメッセージで失敗する可能性があります。

<docs-code hideCopy language="shell">

Error: This test module uses the component BannerComponent
which is using a "templateUrl" or "styleUrls", but they were never compiled.
Please call "TestBed.compileComponents" before your test.

</docs-code>

問題の根本は、テストに関与するコンポーネントの少なくとも 1 つが、`BannerComponent`の次のバージョンで行われているように、外部テンプレートまたは CSS ファイルを指定していることです。

<docs-code header="app/banner/banner-external.component.ts (external template & css)" path="adev/src/content/examples/testing/src/app/banner/banner-external.component.ts"/>

テストは、`TestBed`がコンポーネントの作成を試みたときに失敗します。

<docs-code avoid header="app/banner/banner-external.component.spec.ts (setup that fails)" path="adev/src/content/examples/testing/src/app/banner/banner-external.component.spec.ts" visibleRegion="setup-may-fail"/>

アプリケーションはコンパイルされていないことを思い出してください。
そのため、`createComponent()`を呼び出すと、`TestBed`は暗黙的にコンパイルします。

これは、ソースコードがメモリ内にある場合は問題ありません。
しかし、`BannerComponent`は外部ファイルが必要であり、コンパイラーはファイルシステムからそれらを読み取る必要があります。これは本質的に*非同期*操作です。

`TestBed`が続行することを許可すると、テストが実行され、コンパイラーが完了する前に、不可解な理由で失敗します。

予防的なエラーメッセージは、`compileComponents()`で明示的にコンパイルするように指示しています。

### `compileComponents()`は非同期です

`compileComponents()`は、非同期テスト関数内で呼び出す必要があります。

CRITICAL: テスト関数を非同期にするのを怠ると（たとえば、[waitForAsync()](#waitForAsync)の使用を忘れると）、次のようなエラーメッセージが表示されます。

<docs-code hideCopy language="shell">

Error: ViewDestroyedError: Attempt to use a destroyed view

</docs-code>

一般的なアプローチは、セットアップロジックを 2 つの別の`beforeEach()`関数に分割することです。

| 関数                 | 詳細                           |
| :------------------- | :----------------------------- |
| 非同期`beforeEach()` | コンポーネントをコンパイルする |
| 同期`beforeEach()`   | 残りのセットアップを実行する   |

### 非同期`beforeEach`

最初の非同期`beforeEach`は、次のように記述します。

<docs-code header="app/banner/banner-external.component.spec.ts (async beforeEach)" path="adev/src/content/examples/testing/src/app/banner/banner-external.component.spec.ts" visibleRegion="async-before-each"/>

`TestBed.configureTestingModule()`メソッドは、`TestBed`クラスを返し、`compileComponents()`などの他の`TestBed`の静的メソッドへの呼び出しをチェーンすることができます。

この例では、`BannerComponent`はコンパイルする必要がある唯一のコンポーネントです。
他の例では、複数のコンポーネントでテストモジュールを設定し、さらに多くのコンポーネントを保持するアプリケーションモジュールをインポートする場合があります。
それらのいずれかが外部ファイルが必要になる可能性があります。

`TestBed.compileComponents`メソッドは、テストモジュールで設定されたすべてのコンポーネントを非同期的にコンパイルします。

IMPORTANT: `compileComponents()`を呼び出した後、`TestBed`を再設定しないでください。

`compileComponents()`を呼び出すと、現在の`TestBed`インスタンスがさらに設定されなくなります。
`configureTestingModule()`や`override...`メソッドなど、`TestBed`の構成メソッドをさらに呼び出すことはできません。
`TestBed`は、試行するとエラーをスローします。

`compileComponents()`を、`TestBed.createComponent()`を呼び出す前の最後のステップにしてください。

### 同期`beforeEach`

2 番目の、同期`beforeEach()`には、残りのセットアップ手順が含まれます。これには、コンポーネントの作成と、検査する要素のクエリが含まれます。

<docs-code header="app/banner/banner-external.component.spec.ts (synchronous beforeEach)" path="adev/src/content/examples/testing/src/app/banner/banner-external.component.spec.ts" visibleRegion="sync-before-each"/>

テストランナーは、最初の非同期`beforeEach`が終了するまで待ってから、2 番目を呼び出します。

### 統合された設定

2 つの`beforeEach()`関数を、1 つの非同期`beforeEach()`に統合できます。

`compileComponents()`メソッドはプロミスを返すため、同期セットアップタスクを*コンパイル後*に実行することができます。そのため、同期コードを`await`キーワードの後に移動します。この時点で、プロミスは解決されています。

<docs-code header="app/banner/banner-external.component.spec.ts (one beforeEach)" path="adev/src/content/examples/testing/src/app/banner/banner-external.component.spec.ts" visibleRegion="one-before-each"/>

### `compileComponents()`は安全です

`compileComponents()`を呼び出しても、必要ない場合でも害はありません。

CLI によって生成されたコンポーネントテストファイルは、`ng test`を実行しているときは不要ですが、`compileComponents()`を呼び出します。

このガイドのテストでは、必要に応じてのみ`compileComponents`を呼び出します。

## モジュールインポートによるセットアップ

以前のコンポーネントテストでは、次のようにテストモジュールをいくつかの`declarations`で設定していました。

<docs-code header="app/dashboard/dashboard-hero.component.spec.ts (configure TestBed)" path="adev/src/content/examples/testing/src/app/dashboard/dashboard-hero.component.spec.ts" visibleRegion="config-testbed"/>

`DashboardComponent`はシンプルです。
助けは必要ありません。
しかし、より複雑なコンポーネントは、多くの場合、他のコンポーネント、ディレクティブ、パイプ、およびプロバイダーに依存しており、これらをテストモジュールにも追加する必要があります。

幸いなことに、`TestBed.configureTestingModule`のパラメーターは、`@NgModule`デコレーターに渡されるメタデータと並行しているため、`providers`と`imports`も指定できます。

`HeroDetailComponent`は、小さいサイズでシンプルな構造にもかかわらず、多くの助けを必要としています。
デフォルトのテストモジュール`CommonModule`からサポートを受けることに加えて、次のようなものが必要です。

- `FormsModule`の`NgModel`など、双方向データバインディングを有効にする
- `shared`フォルダの`TitleCasePipe`
- ルーターサービス
- ヒーローのデータアクセスサービス

1 つのアプローチは、次の例のように、個々のピースからテストモジュールを設定することです。

<docs-code header="app/hero/hero-detail.component.spec.ts (FormsModule setup)" path="adev/src/content/examples/testing/src/app/hero/hero-detail.component.spec.ts" visibleRegion="setup-forms-module"/>

HELPFUL: `beforeEach()`が非同期であり、`TestBed.compileComponents`を呼び出していることに注意してください。なぜなら、`HeroDetailComponent`は外部テンプレートと css ファイルを持っているからです。

[compileComponents の呼び出し](#calling-compilecomponents)で説明されているように、これらのテストは、Angular がブラウザでそれらをコンパイルする必要がある、CLI 以外の環境で実行することができます。

### 共有モジュールのインポート

多くのアプリケーションコンポーネントが`FormsModule`と`TitleCasePipe`を必要とするため、開発者は`SharedModule`を作成して、これらと他の頻繁に要求される部分を組み合わせました。

テスト設定では、次の例のように、`SharedModule`も使用できます。

<docs-code header="app/hero/hero-detail.component.spec.ts (SharedModule setup)" path="adev/src/content/examples/testing/src/app/hero/hero-detail.component.spec.ts" visibleRegion="setup-shared-module"/>

これは少しタイトで小さく、インポートステートメントが少なくなります。この例では示されていません。

### 機能モジュールのインポート

`HeroDetailComponent`は、`SharedModule`など、相互依存する部分をさらにまとめた`HeroModule` [機能モジュール](guide/ngmodules/feature-modules)の一部です。
次のような`HeroModule`をインポートするテスト設定を試してみましょう。

<docs-code header="app/hero/hero-detail.component.spec.ts (HeroModule setup)" path="adev/src/content/examples/testing/src/app/hero/hero-detail.component.spec.ts" visibleRegion="setup-hero-module"/>

`providers`の*テストダブル*のみが残ります。
`HeroDetailComponent`の宣言でさえなくなっています。

実際、宣言しようとすると、Angular はエラーをスローします。なぜなら、`HeroDetailComponent`は`HeroModule`と`TestBed`によって作成された`DynamicTestModule`の両方で宣言されているからです。

HELPFUL: コンポーネントの機能モジュールをインポートすると、モジュール内に多くの相互依存関係があり、モジュールが小さい場合（機能モジュールは通常小さい）にテストを設定する最良の方法になる場合があります。

## コンポーネントプロバイダーのオーバーライド

`HeroDetailComponent`は独自の`HeroDetailService`を提供します。

<docs-code header="app/hero/hero-detail.component.ts (prototype)" path="adev/src/content/examples/testing/src/app/hero/hero-detail.component.ts" visibleRegion="prototype"/>

`TestBed.configureTestingModule`の`providers`でコンポーネントの`HeroDetailService`をスタブすることはできません。
それらは*テストモジュール*のプロバイダーであり、コンポーネントのプロバイダーではありません。
それらは*フィクスチャレベル*で依存関係インジェクターを準備します。

Angular は、コンポーネントを*独自の*インジェクターで作成します。これは、フィクスチャインジェクターの*子*です。
これは、コンポーネントのプロバイダー（この場合は`HeroDetailService`）を子インジェクターに登録します。

テストは、フィクスチャインジェクターから子インジェクターのサービスを取得できません。
`TestBed.configureTestingModule`もそれらを設定することはできません。

Angular は、ずっと前から実際の`HeroDetailService`の新しいインスタンスを作成していました！

HELPFUL: これらのテストは、`HeroDetailService`がリモートサーバーに独自の XHR 呼び出しを行う場合、失敗したり、タイムアウトしたりする可能性があります。
呼び出すリモートサーバーがない可能性があります。

幸いなことに、`HeroDetailService`は、リモートデータアクセスの責任を注入された`HeroService`に委任しています。

<docs-code header="app/hero/hero-detail.service.ts (prototype)" path="adev/src/content/examples/testing/src/app/hero/hero-detail.service.ts" visibleRegion="prototype"/>

[前のテスト設定](#import-a-feature-module)は、実際の`HeroService`を`TestHeroService`に置き換えます。これは、サーバーリクエストをインターセプトし、その応答を偽造します。

もし、そんなに恵まれていなかったらどうでしょうか？
`HeroService`を偽造するのが難しい場合はどうでしょうか？
`HeroDetailService`が独自のサーバーリクエストを行う場合はどうでしょうか？

`TestBed.overrideComponent`メソッドは、次のようなセットアップのバリエーションのように、コンポーネントの`providers`を管理しやすい*テストダブル*に置き換えることができます。

<docs-code header="app/hero/hero-detail.component.spec.ts (Override setup)" path="adev/src/content/examples/testing/src/app/hero/hero-detail.component.spec.ts" visibleRegion="setup-override"/>

`TestBed.configureTestingModule`は、[不要になったため](#spy-stub)、偽の`HeroService`を提供しなくなっていることに注意してください。

### `overrideComponent`メソッド

`overrideComponent`メソッドに注目してください。

<docs-code header="app/hero/hero-detail.component.spec.ts (overrideComponent)" path="adev/src/content/examples/testing/src/app/hero/hero-detail.component.spec.ts" visibleRegion="override-component-method"/>

これは、2 つの引数を取ります。オーバーライドするコンポーネントタイプ（`HeroDetailComponent`）と、オーバーライドメタデータオブジェクトです。
[オーバーライドメタデータオブジェクト](guide/testing/utility-apis#metadata-override-object)は、次のように定義された汎用型です。

<docs-code language="javascript">

type MetadataOverride<T> = {
add?: Partial<T>;
remove?: Partial<T>;
set?: Partial<T>;
};

</docs-code>

メタデータオーバーライドオブジェクトは、メタデータプロパティの要素を追加および削除するか、それらのプロパティを完全にリセットできます。
この例では、コンポーネントの`providers`メタデータをリセットします。

型パラメーター`T`は、`@Component`デコレーターに渡すメタデータの種類です。

<docs-code language="javascript">

selector?: string;
template?: string;
templateUrl?: string;
providers?: any[];
…

</docs-code>

### _スパイスタブ_（`HeroDetailServiceSpy`）を提供する

この例では、コンポーネントの`providers`配列を、`HeroDetailServiceSpy`を含む新しい配列に完全に置き換えます。

`HeroDetailServiceSpy`は、実際の`HeroDetailService`のスタブバージョンであり、そのサービスに必要なすべての機能を偽造します。
これは、下位の`HeroService`を注入したり、委任したりしないため、そのためのテストダブルを提供する必要はありません。

関連する`HeroDetailComponent`のテストは、サービスメソッドをスパイすることで、`HeroDetailService`のメソッドが呼び出されたことをアサートします。
それに応じて、スタブはメソッドをスパイとして実装します。

<docs-code header="app/hero/hero-detail.component.spec.ts (HeroDetailServiceSpy)" path="adev/src/content/examples/testing/src/app/hero/hero-detail.component.spec.ts" visibleRegion="hds-spy"/>

### オーバーライドテスト

これでテストは、スパイスタブの`testHero`を操作することでコンポーネントのヒーローを直接制御し、サービスメソッドが呼び出されたことを確認できます。

<docs-code header="app/hero/hero-detail.component.spec.ts (override tests)" path="adev/src/content/examples/testing/src/app/hero/hero-detail.component.spec.ts" visibleRegion="override-tests"/>

### さらなるオーバーライド

`TestBed.overrideComponent`メソッドは、同じコンポーネントまたは異なるコンポーネントに対して複数回呼び出すことができます。
`TestBed`はこれらの他のクラスの一部を掘り下げて置き換えるために、`overrideDirective`や`overrideModule`、`overridePipe`などの類似のメソッドを提供します。

これらのオプションと組み合わせを自分で調べてみてください。

# 属性ディレクティブのテスト

*属性ディレクティブ*は、要素、コンポーネント、または他のディレクティブの動作を変更します。
その名前は、ディレクティブが適用される方法、つまりホスト要素の属性として適用される方法を反映しています。

## `HighlightDirective`のテスト

サンプルアプリケーションの`HighlightDirective`は、データバインドされた色またはデフォルトの色（ライトグレー）に基づいて、要素の背景色を設定します。
また、要素のカスタムプロパティ（`customProperty`）を`true`に設定しますが、これは単に設定できることを示すためです。

<docs-code header="app/shared/highlight.directive.ts" path="adev/src/content/examples/testing/src/app/shared/highlight.directive.ts"/>

これはアプリケーション全体で使用されています。おそらく最も簡単な例は`AboutComponent`です。

<docs-code header="app/about/about.component.ts" path="adev/src/content/examples/testing/src/app/about/about.component.ts"/>

`AboutComponent`内での`HighlightDirective`の特定の使用をテストするには、[Component testing scenarios](guide/testing/components-scenarios)セクションの["Nested component tests"](guide/testing/components-scenarios#nested-component-tests)で説明されているテクニックのみが必要です。

<docs-code header="app/about/about.component.spec.ts" path="adev/src/content/examples/testing/src/app/about/about.component.spec.ts" visibleRegion="tests"/>

しかし、単一のユースケースをテストしても、ディレクティブの機能のすべてを調べられるとは限りません。
ディレクティブを使用するすべてのコンポーネントを見つけてテストすることは、面倒で壊れやすく、完全なカバレッジを実現する可能性もほとんどありません。

*クラスのみのテスト*は役立つ場合がありますが、このディレクティブのような属性ディレクティブは、DOM を操作する傾向があります。
孤立したユニットテストは DOM に触れないため、ディレクティブの有効性に対する信頼を得られません。

より良い解決策は、ディレクティブのすべての適用方法を示す人工的なテストコンポーネントを作成することです。

<docs-code header="app/shared/highlight.directive.spec.ts (TestComponent)" path="adev/src/content/examples/testing/src/app/shared/highlight.directive.spec.ts" visibleRegion="test-component"/>

<img alt="HighlightDirective spec in action" src="assets/images/guide/testing/highlight-directive-spec.png">

HELPFUL: `<input>`のケースでは、`HighlightDirective`を、入力ボックス内の色の値の名前とバインドしています。
初期値は単語"cyan"であり、これは入力ボックスの背景色になります。

このコンポーネントのテストをいくつか紹介します。

<docs-code header="app/shared/highlight.directive.spec.ts (selected tests)" path="adev/src/content/examples/testing/src/app/shared/highlight.directive.spec.ts" visibleRegion="selected-tests"/>

いくつかのテクニックが注目に値します。

- `By.directive`述語は、_要素の種類が不明な場合_、このディレクティブを持つ要素を取得する優れた方法です。
- `By.css('h2:not([highlight])')`の[`:not`擬似クラス](https://developer.mozilla.org/docs/Web/CSS/:not)は、ディレクティブを持っていない`<h2>`要素を見つけるのに役立ちます。
  `By.css('*:not([highlight])')`は、ディレクティブを持っていない*すべての*要素を見つけます。

- `DebugElement.styles`は、`DebugElement`抽象化のおかげで、実際のブラウザがなくても、要素のスタイルにアクセスできます。
  しかし、抽象化よりも簡単で明確な場合は、`nativeElement`を利用してください。

- Angular は、適用された要素のインジェクターにディレクティブを追加します。
  デフォルトの色に対するテストでは、2 番目の`<h2>`のインジェクターを使用して、その`HighlightDirective`インスタンスとその`defaultColor`を取得します。

- `DebugElement.properties`は、ディレクティブによって設定された人工的なカスタムプロパティにアクセスできます。

# パイプのテスト

Angular のテストユーティリティを使わずに[パイプ](guide/templates/pipes)をテストできます。

## `TitleCasePipe`のテスト

パイプクラスには、入力値を変換された出力値に変換する`transform`メソッドが 1 つあります。
`transform`の実装は、DOM とほとんどやり取りしません。
ほとんどのパイプは、`@Pipe`メタデータとインターフェース以外、Angular に依存していません。

各単語の最初の文字を大文字にする`TitleCasePipe`を考えてみましょう。
正規表現を使った実装を以下に示します。

<docs-code header="app/shared/title-case.pipe.ts" path="adev/src/content/examples/testing/src/app/shared/title-case.pipe.ts"/>

正規表現を使用するものは、徹底的にテストする価値があります。
簡単な Jasmine を使用して、期待されるケースとエッジケースを調べます。

<docs-code header="app/shared/title-case.pipe.spec.ts" path="adev/src/content/examples/testing/src/app/shared/title-case.pipe.spec.ts" visibleRegion="excerpt"/>

## パイプテストをサポートする DOM テストの作成

これらはパイプの*単体*テストです。
これらは、`TitleCasePipe`がアプリケーションコンポーネントに適用されたときに正しく動作しているかどうかを判断できません。

このようなコンポーネントテストを追加することを考えてみましょう。

<docs-code header="app/hero/hero-detail.component.spec.ts (pipe test)" path="adev/src/content/examples/testing/src/app/hero/hero-detail.component.spec.ts" visibleRegion="title-case-pipe"/>

# デバッグテスト

テストが期待通りに動作しない場合は、ブラウザでテストを検査してデバッグできます。

アプリケーションをデバッグするのと同じように、ブラウザでスペックをデバッグできます。

1. Karma ブラウザウィンドウを表示します。
   この手順で助けが必要な場合は、[テストの設定](guide/testing#set-up-testing)をご覧ください。

1. **DEBUG**ボタンをクリックして新しいブラウザタブを開き、テストを再実行します。
1. ブラウザの**開発者ツール**を開きます。Windows では`Ctrl-Shift-I`、macOS では`Command-Option-I`を押します。
1. **Sources**セクションを選択します。
1. `Control/Command-P`を押して、テストファイルの名前を入力し始めると、ファイルが開きます。
1. テストにブレークポイントを設定します。
1. ブラウザを更新すると、ブレークポイントで停止します。

<img alt="Karma debugging" src="assets/images/guide/testing/karma-1st-spec-debug.png">

# テストユーティリティ API

このページでは、最も役立つ Angular テスト機能について説明します。

Angular テストユーティリティには、`TestBed`、`ComponentFixture`、およびテスト環境を制御するいくつかの関数が含まれています。
[`TestBed`](#testbed-api-summary) および [`ComponentFixture`](#component-fixture-api-summary) クラスは、別途説明します。

以下は、スタンドアロン関数の概要を、ユーティリティの利用頻度順に示します。

| 関数                         | 詳細                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `waitForAsync`               | テスト（`it`）または設定（`beforeEach`）関数の本体を、特別な _非同期テストゾーン_ 内で実行します。[waitForAsync](guide/testing/components-scenarios#waitForAsync) を参照してください。                                                                                                                                                                                                                                                                                                                                                                                          |
| `fakeAsync`                  | テスト（`it`）関数の本体を、特別な _fakeAsync テストゾーン_ 内で実行します。これにより、線形制御フローのコーディングスタイルが可能になります。[fakeAsync](guide/testing/components-scenarios#fake-async) を参照してください。                                                                                                                                                                                                                                                                                                                                                   |
| `tick`                       | 時間の経過と保留中の非同期アクティビティの完了をシミュレートし、_fakeAsync テストゾーン_ 内の _タイマー_ および _マイクロタスク_ キューの両方をフラッシュします。興味のある読者向けに、この長いブログ投稿、[_タスク、マイクロタスク、キュー、スケジュール_](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules)を紹介します。オプションの引数を受け付け、仮想クロックを指定されたミリ秒数だけ進めます。これにより、その時間枠内にスケジュールされた非同期アクティビティがクリアされます。[tick](guide/testing/components-scenarios#tick) を参照してください。 |
| `inject`                     | 現在の `TestBed` インジェクターから、1 つ以上のサービスをテスト関数に注入します。これは、コンポーネント自体によって提供されるサービスを注入することはできません。[debugElement.injector](guide/testing/components-scenarios#get-injected-services) の議論を参照してください。                                                                                                                                                                                                                                                                                                   |
| `discardPeriodicTasks`       | `fakeAsync()` テストが保留中のタイマーイベント _タスク_（キューに入れられた `setTimeOut` および `setInterval` コールバック）で終了すると、テストは明確なエラーメッセージで失敗します。 <br /> 一般的に、テストはキューに入れられたタスクなしで終了する必要があります。保留中のタイマータスクが予想される場合は、`discardPeriodicTasks` を呼び出して _タスク_ キューをフラッシュし、エラーを回避します。                                                                                                                                                                         |
| `flushMicrotasks`            | `fakeAsync()` テストが保留中の _マイクロタスク_（未解決の Promise など）で終了すると、テストは明確なエラーメッセージで失敗します。 <br /> 一般的に、テストはマイクロタスクが完了するまで待つ必要があります。保留中のマイクロタスクが予想される場合は、`flushMicrotasks` を呼び出して _マイクロタスク_ キューをフラッシュし、エラーを回避します。                                                                                                                                                                                                                                |
| `ComponentFixtureAutoDetect` | [自動的な変更検出](guide/testing/components-scenarios#automatic-change-detection) をオンにするサービスの提供トークン。                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `getTestBed`                 | 現在の `TestBed` のインスタンスを取得します。通常、`TestBed` クラスの静的クラスメソッドが十分なため、これは不要です。`TestBed` インスタンスは、静的メソッドとして利用できない、まれに使用されるメンバーをいくつか公開します。                                                                                                                                                                                                                                                                                                                                                   |

## `TestBed` クラスの概要

`TestBed` クラスは、主要な Angular テストユーティリティの 1 つです。
API は非常に大きく、少しづつ調べていくまで、圧倒される可能性があります。
API 全体を理解しようとする前に、このガイドの前半部分を読んで、基本を理解してください。

`configureTestingModule` に渡されるモジュール定義は、`@NgModule` メタデータプロパティのサブセットです。

<docs-code language="javascript">

type TestModuleMetadata = {
providers?: any[];
declarations?: any[];
imports?: any[];
schemas?: Array<SchemaMetadata | any[]>;
};

</docs-code>

各オーバーライドメソッドは、`MetadataOverride<T>` を受け取ります。ここで `T` はメソッドに適したメタデータの種類、つまり `@NgModule`、`@Component`、`@Directive`、または `@Pipe` のパラメーターです。

<docs-code language="javascript">

type MetadataOverride<T> = {
add?: Partial<T>;
remove?: Partial<T>;
set?: Partial<T>;
};

</docs-code>

`TestBed` API は、現在の `TestBed` の _グローバル_ インスタンスを更新または参照する静的クラスメソッドで構成されています。

内部的には、すべての静的メソッドは、現在のランタイム `TestBed` インスタンスのメソッドをカバーしています。これは、`getTestBed()` 関数によっても返されます。

`beforeEach()` _内_ で `TestBed` メソッドを呼び出して、各テストの前に新しい開始を確保します。

以下は、最も重要な静的メソッドを、ユーティリティの利用頻度順に示します。

| メソッド                 | 詳細                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `configureTestingModule` | テストシム（`karma-test-shim`、`browser-test-shim`）は、[初期テスト環境](guide/testing) とデフォルトのテストモジュールを確立します。デフォルトのテストモジュールは、基本的な宣言と、すべてのテスターに必要な、いくつかの Angular サービスの代替で構成されています。 <br /> `configureTestingModule` を呼び出して、インポート、宣言（コンポーネント、ディレクティブ、およびパイプ）、およびプロバイダーを追加および削除することで、特定のテストセットのテストモジュール構成を洗練します。            |
| `compileComponents`      | テストモジュールを構成し終えたら、非同期にコンパイルします。_いずれかの_ テストモジュールコンポーネントに `templateUrl` または `styleUrls` がある場合は、このメソッドを **必ず** 呼び出す必要があります。これは、コンポーネントテンプレートとスタイルファイルの取得が必ず非同期であるためです。[compileComponents](guide/testing/components-scenarios#calling-compilecomponents) を参照してください。 <br /> `compileComponents` を呼び出すと、現在の仕様の期間中、`TestBed` の構成は固定されます。 |
| `createComponent<T>`     | 現在の `TestBed` の構成に基づいて、`T` 型のコンポーネントのインスタンスを作成します。`createComponent` を呼び出すと、現在の仕様の期間中、`TestBed` の構成は固定されます。                                                                                                                                                                                                                                                                                                                           |
| `overrideModule`         | 指定された `NgModule` のメタデータを置き換えます。モジュールは他のモジュールをインポートできることに注意してください。`overrideModule` メソッドは、現在のテストモジュールを深く掘り下げて、これらの内部モジュールのいずれかを変更できます。                                                                                                                                                                                                                                                         |
| `overrideComponent`      | 指定されたコンポーネントクラスのメタデータを置き換えます。これは、内部モジュールの中に深くネストされている可能性があります。                                                                                                                                                                                                                                                                                                                                                                        |
| `overrideDirective`      | 指定されたディレクティブクラスのメタデータを置き換えます。これは、内部モジュールの中に深くネストされている可能性があります。                                                                                                                                                                                                                                                                                                                                                                        |
| `overridePipe`           | 指定されたパイプクラスのメタデータを置き換えます。これは、内部モジュールの中に深くネストされている可能性があります。                                                                                                                                                                                                                                                                                                                                                                                |

|
`inject` | 現在の `TestBed` インジェクターからサービスを取得します。`inject` 関数は、この目的には多くの場合で十分です。ただし、`inject` は、サービスを提供できない場合にエラーをスローします。 <br /> サービスがオプションの場合どうすればよいですか？ <br /> `TestBed.inject()` メソッドは、オプションの第 2 パラメーターとして、Angular がプロバイダーを見つけられない場合に返すオブジェクト（この例では `null`）を取ります。 <docs-code header="app/demo/demo.testbed.spec.ts" path="adev/src/content/examples/testing/src/app/demo/demo.testbed.spec.ts" visibleRegion="testbed-get-w-null"/> `TestBed.inject` を呼び出すと、現在の仕様の期間中、`TestBed` の構成は固定されます。 |
|
`initTestEnvironment` | テストの実行全体でテスト環境を初期化します。 <br /> テストシム（`karma-test-shim`、`browser-test-shim`）はこれを実行するため、自分で呼び出す必要はほとんどありません。 <br /> このメソッドは _ちょうど 1 回_ 呼び出します。テストの実行中にこのデフォルトを変更するには、最初に `resetTestEnvironment` を呼び出します。 <br /> Angular コンパイラーファクトリ、`PlatformRef`、およびデフォルトの Angular テストモジュールを指定します。ブラウザ以外のプラットフォームの代替手段は、`@angular/platform-<platform_name>/testing/<platform_name>` という一般的な形式で利用できます。 |
| `resetTestEnvironment` | デフォルトのテストモジュールを含む、初期テスト環境をリセットします。 |

`TestBed` インスタンスのメソッドのいくつかは、静的な `TestBed` _クラス_ メソッドではカバーされていません。
これらは、めったに必要ありません。

## `ComponentFixture`

`TestBed.createComponent<T>` は、コンポーネント `T` のインスタンスを作成し、そのコンポーネントの強く型付けされた `ComponentFixture` を返します。

`ComponentFixture` のプロパティとメソッドは、コンポーネント、その DOM 表現、および Angular 環境の側面へのアクセスを提供します。

### `ComponentFixture` のプロパティ

以下は、テスターにとって最も重要なプロパティを、ユーティリティの利用頻度順に示します。

| プロパティ          | 詳細                                                                                                                                                                                                                                                                                         |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `componentInstance` | `TestBed.createComponent` によって作成されたコンポーネントクラスのインスタンス。                                                                                                                                                                                                             |
| `debugElement`      | コンポーネントのルート要素に関連付けられた `DebugElement`。 <br /> `debugElement` は、テストとデバッグ中に、コンポーネントとその DOM 要素に関する洞察を提供します。これは、テスターにとって重要なプロパティです。最も興味深いメンバーは、[下記](#debug-element-details) に記載されています。 |
| `nativeElement`     | コンポーネントのルートにあるネイティブ DOM 要素。                                                                                                                                                                                                                                            |
| `changeDetectorRef` | コンポーネントの `ChangeDetectorRef`。 <br /> `ChangeDetectorRef` は、コンポーネントが `ChangeDetectionStrategy.OnPush` メソッドを持っているか、コンポーネントの変更検知がプログラムによって制御されている場合に最も役立ちます。                                                             |

### `ComponentFixture` のメソッド

_fixture_ メソッドは、Angular にコンポーネントツリーで特定のタスクを実行させます。
シミュレートされたユーザーアクションに応答して、Angular の動作をトリガーするには、これらのメソッドを呼び出します。

以下は、テスターにとって最も役立つメソッドです。

| メソッド            | 詳細                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `detectChanges`     | コンポーネントの変更検知サイクルをトリガーします。 <br /> コンポーネントを初期化するには、これを呼び出します（`ngOnInit` を呼び出します）。また、テストコードの後、コンポーネントのデータバインドプロパティ値を変更します。Angular は、`personComponent.name` を変更したことを認識していないため、`detectChanges` を呼び出すまで、`name` バインディングを更新しません。 <br /> `detectChanges(false)` として呼び出さない限り、後続で `checkNoChanges` を実行して、循環的な更新がないことを確認します。                                                             |
| `autoDetectChanges` | `true` に設定すると、fixture が変更を自動的に検出します。 <br /> 自動検出が `true` の場合、テスト fixture はコンポーネントの作成直後に `detectChanges` を呼び出します。その後、適切なゾーンイベントを監視し、それに応じて `detectChanges` を呼び出します。テストコードでコンポーネントのプロパティ値を直接変更する場合は、それでもデータバインディングの更新をトリガーするために、`fixture.detectChanges` を呼び出す必要がある可能性があります。 <br /> デフォルトは `false` です。テストの動作を細かく制御したいテスターは、通常、これを `false` のままにします。 |
| `checkNoChanges`    | 変更検知を実行して、保留中の変更がないことを確認します。変更がある場合は、例外をスローします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `isStable`          | fixture が現在 _安定_ している場合は、`true` を返します。非同期タスクがまだ完了していない場合は、`false` を返します。                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `whenStable`        | fixture が安定したら解決される Promise を返します。 <br /> 非同期アクティビティまたは非同期的な変更検知の完了後にテストを再開するには、その Promise をフックします。[whenStable](guide/testing/components-scenarios#whenstable) を参照してください。                                                                                                                                                                                                                                                                                                               |
| `destroy`           | コンポーネントの破棄をトリガーします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

#### `DebugElement`

`DebugElement` は、コンポーネントの DOM 表現に関する重要な洞察を提供します。

テストのルートコンポーネントの `DebugElement`（`fixture.debugElement` によって返される）から、fixture の要素とコンポーネントのサブツリー全体を（クエリを使用して）移動できます。

以下は、テスターにとって最も役立つ `DebugElement` のメンバーを、ユーティリティの利用頻度順に示します。

| メンバー              | 詳細                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `nativeElement`       | ブラウザの対応する DOM 要素                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `query`               | `query(predicate: Predicate<DebugElement>)` を呼び出すと、サブツリーの任意の深さで、[述語](#query-predicate) と一致する最初の `DebugElement` が返されます。                                                                                                                                                                                                                                                                                                   |
| `queryAll`            | `queryAll(predicate: Predicate<DebugElement>)` を呼び出すと、サブツリーの任意の深さで、[述語](#query-predicate) と一致するすべての `DebugElements` が返されます。                                                                                                                                                                                                                                                                                             |
| `injector`            | ホスト依存インジェクター。たとえば、ルート要素のコンポーネントインスタンスインジェクター。                                                                                                                                                                                                                                                                                                                                                                    |
| `componentInstance`   | 要素自身のコンポーネントインスタンス（存在する場合）。                                                                                                                                                                                                                                                                                                                                                                                                        |
| `context`             | この要素に親コンテキストを提供するオブジェクト。多くの場合、この要素を管理する祖先コンポーネントインスタンスです。 <br /> 要素が `*ngFor` 内で繰り返される場合、コンテキストは `NgForOf` で、その `$implicit` プロパティは行インスタンス値の値です。たとえば、`*ngFor="let hero of heroes"` の `hero` です。                                                                                                                                                  |
| `children`            | 直近の `DebugElement` の子。`children` を介して階層を下降することで、ツリーを移動します。 `DebugElement` には `childNodes` もあり、これは `DebugNode` オブジェクトのリストです。`DebugElement` は `DebugNode` オブジェクトから派生しており、多くの場合、要素よりも多くのノードがあります。テスターは、通常、プレーンノードを無視できます。                                                                                                                    |
| `parent`              | `DebugElement` の親。これがルート要素の場合は `null` です。                                                                                                                                                                                                                                                                                                                                                                                                   |
| `name`                | 要素が要素の場合、要素のタグ名。                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `triggerEventHandler` | イベントに名前が付けられている場合、要素の `listeners` コレクションに対応するリスナーがある場合は、そのイベントをトリガーします。第 2 パラメーターは、ハンドラーで予想される _イベントオブジェクト_ です。[triggerEventHandler](guide/testing/components-scenarios#trigger-event-handler) を参照してください。 <br /> イベントにリスナーがない場合や、その他の問題がある場合は、`nativeElement.dispatchEvent(eventObject)` を呼び出すことを検討してください。 |
| `listeners`           | コンポーネントの `@Output` プロパティまたは要素のイベントプロパティに添付されたコールバック。                                                                                                                                                                                                                                                                                                                                                                 |
| `providerTokens`      | このコンポーネントのインジェクターのルックアップトークン。コンポーネント自体と、コンポーネントが `providers` メタデータにリストしているトークンが含まれます。                                                                                                                                                                                                                                                                                                 |
| `source`              | ソースコンポーネントテンプレートでこの要素を見つける場所。                                                                                                                                                                                                                                                                                                                                                                                                    |
| `references`          | テンプレートローカル変数（たとえば、`#foo`）に関連付けられているオブジェクトの辞書。ローカル変数名でキー付けされます。                                                                                                                                                                                                                                                                                                                                        |

`DebugElement.query(predicate)` および `DebugElement.queryAll(predicate)` メソッドは、ソース要素のサブツリーをフィルター処理して、一致する `DebugElement` を見つける述語を受け取ります。

述語は、`DebugElement` を受け取り、_真偽値_ を返す任意のメソッドです。
次の例は、"content" という名前のテンプレートローカル変数への参照を持つすべての `DebugElements` を見つけます。

<docs-code header="app/demo/demo.testbed.spec.ts" path="adev/src/content/examples/testing/src/app/demo/demo.testbed.spec.ts" visibleRegion="custom-predicate"/>

Angular の `By` クラスには、一般的な述語の 3 つの静的メソッドがあります。

| 静的メソッド              | 詳細                                                                |
| :------------------------ | :------------------------------------------------------------------ |
| `By.all`                  | すべての要素を返す                                                  |
| `By.css(selector)`        | 一致する CSS セレクターを持つ要素を返す                             |
| `By.directive(directive)` | ディレクティブクラスのインスタンスに Angular が一致させた要素を返す |

<docs-code header="app/hero/hero-list.component.spec.ts" path="adev/src/content/examples/testing/src/app/hero/hero-list.component.spec.ts" visibleRegion="by"/>

# Component harnesses overview

A <strong>component harness</strong> is a class that allows tests to interact with components the way an end user does via a supported API. You can create test harnesses for any component, ranging from small reusable widgets to full pages.

Harnesses offer several benefits:

- They make tests less brittle by insulating themselves against implementation details of a component, such as its DOM structure
- They make tests become more readable and easier to maintain
- They can be used across multiple testing environments

<docs-code language="typescript">
// Example of test with a harness for a component called MyButtonComponent
it('should load button with exact text', async () => {
  const button = await loader.getHarness(MyButtonComponentHarness);
  expect(await button.getText()).toBe('Confirm');
});
</docs-code>

Component harnesses are especially useful for shared UI widgets. Developers often write tests that depend on private implementation details of widgets, such as DOM structure and CSS classes. Those dependencies make tests brittle and hard to maintain. Harnesses offer an alternative— a supported API that interacts with the widget the same way an end-user does. Widget implementation changes now become less likely to break user tests. For example, [Angular Material](https://material.angular.io/components/categories) provides a test harness for each component in the library.

Component harnesses support multiple testing environments. You can use the same harness implementation in both unit and end-to-end tests. Test authors only need to learn one API and component authors don't have to maintain separate unit and end-to-end test implementations.

Many developers can be categorized by one of the following developer type categories: test authors, component harness authors, and harness environment authors. Use the table below to find the most relevant section in this guide based on these categories:

| Developer Type              | Description                                                                                                                                                                                                                                                                                            | Relevant Section                                                                                             |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| Test Authors                | Developers that use component harnesses written by someone else to test their application. For example, this could be an app developer who uses a third-party menu component and needs to interact with the menu in a unit test.                                                                       | [Using component harnesses in tests](guide/testing/using-component-harnesses)                                |
| Component harness authors   | Developers who maintain some reusable Angular components and want to create a test harness for its users to use in their tests. For example, an author of a third party Angular component library or a developer who maintains a set of common components for a large Angular application.             | [Creating component harnesses for your components](guide/testing/creating-component-harnesses)               |
| Harness environment authors | Developers who want to add support for using component harnesses in additional testing environments. For information on supported testing environments out-of-the-box, see the [test harness environments and loaders](guide/testing/using-component-harnesses#test-harness-environments-and-loaders). | [Adding support for additional testing environments](guide/testing/component-harnesses-testing-environments) |

For the full API reference, please see the [Angular CDK's component harness API reference page](https://material.angular.io/cdk/test-harnesses/api).

# Using component harnesses in tests

## Before you start

Tip: This guide assumes you've already read the [component harnesses overview guide](guide/testing/component-harnesses-overview). Read that first if you're new to using component harnesses.

### CDK Installation

The [Component Dev Kit (CDK)](https://material.angular.io/cdk/categories) is a set of behavior primitives for building components. To use the component harnesses, first install `@angular/cdk` from npm. You can do this from your terminal using the Angular CLI:

<docs-code language="shell">
  ng add @angular/cdk
</docs-code>

## Test harness environments and loaders

You can use component test harnesses in different test environments. Angular CDK supports two built-in environments:

- Unit tests with Angular's `TestBed`
- End-to-end tests with [WebDriver](https://developer.mozilla.org/en-US/docs/Web/WebDriver)

Each environment provides a <strong>harness loader</strong>. The loader creates the harness instances you use throughout your tests. See below for more specific guidance on supported testing environments.

Additional testing environments require custom bindings. See the [adding harness support for additional testing environments guide](guide/testing/component-harnesses-testing-environments) for more information.

### Using the loader from `TestbedHarnessEnvironment` for unit tests

For unit tests you can create a harness loader from [TestbedHarnessEnvironment](https://material.angular.io/cdk/test-harnesses/api#TestbedHarnessEnvironment). This environment uses a [component fixture](api/core/testing/ComponentFixture) created by Angular's `TestBed`.

To create a harness loader rooted at the fixture's root element, use the `loader()` method:

<docs-code language="typescript">
const fixture = TestBed.createComponent(MyComponent);

// Create a harness loader from the fixture
const loader = TestbedHarnessEnvironment.loader(fixture);
...

// Use the loader to get harness instances
const myComponentHarness = await loader.getHarness(MyComponent);
</docs-code>

To create a harness loader for harnesses for elements that fall outside the fixture, use the `documentRootLoader()` method. For example, code that displays a floating element or pop-up often attaches DOM elements directly to the document body, such as the `Overlay` service in Angular CDK.

You can also create a harness loader directly with `harnessForFixture()` for a harness at that fixture's root element directly.

### Using the loader from `SeleniumWebDriverHarnessEnvironment` for end-to-end tests

For WebDriver-based end-to-end tests you can create a harness loader with `SeleniumWebDriverHarnessEnvironment`.

Use the `loader()` method to get the harness loader instance for the current HTML document, rooted at the document's root element. This environment uses a WebDriver client.

<docs-code language="typescript">
let wd: webdriver.WebDriver = getMyWebDriverClient();
const loader = SeleniumWebDriverHarnessEnvironment.loader(wd);
...
const myComponentHarness = await loader.getHarness(MyComponent);
</docs-code>

## Using a harness loader

Harness loader instances correspond to a specific DOM element and are used to create component harness instances for elements under that specific element.

To get `ComponentHarness` for the first instance of the element, use the `getHarness()` method. You get all `ComponentHarness` instances, use the `getAllHarnesses()` method.

<docs-code language="typescript">
// Get harness for first instance of the element
const myComponentHarness = await loader.getHarness(MyComponent);

// Get harnesses for all instances of the element
const myComponentHarnesses = await loader.getHarnesses(MyComponent);
</docs-code>

As an example, consider a reusable dialog-button component that opens a dialog on click. It contains the following components, each with a corresponding harness:

- `MyDialogButton` (composes the `MyButton` and `MyDialog` with a convenient API)
- `MyButton` (a standard button component)
- `MyDialog` (a dialog appended to `document.body` by `MyDialogButton` upon click)

The following test loads harnesses for each of these components:

<docs-code language="typescript">
let fixture: ComponentFixture<MyDialogButton>;
let loader: HarnessLoader;
let rootLoader: HarnessLoader;

beforeEach(() => {
fixture = TestBed.createComponent(MyDialogButton);
loader = TestbedHarnessEnvironment.loader(fixture);
rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
});

it('loads harnesses', async () => {
// Load a harness for the bootstrapped component with `harnessForFixture`
dialogButtonHarness =
await TestbedHarnessEnvironment.harnessForFixture(fixture, MyDialogButtonHarness);
// The button element is inside the fixture's root element, so we use `loader`.
const buttonHarness = await loader.getHarness(MyButtonHarness);
// Click the button to open the dialog
await buttonHarness.click();
// The dialog is appended to `document.body`, outside of the fixture's root element,
// so we use `rootLoader` in this case.
const dialogHarness = await rootLoader.getHarness(MyDialogHarness);
// ... make some assertions
});
</docs-code>

### Harness behavior in different environments

Harnesses may not behave exactly the same in all environments. Some differences are unavoidable between the real user interaction versus the simulated events generated in unit tests. Angular CDK makes a best effort to normalize the behavior to the extent possible.

### Interacting with child elements

To interact with elements below the root element of this harness loader, use the `HarnessLoader` instance of a child element. For the first instance of the child element, use the `getChildLoader()` method. For all instances of the child element, use the `getAllChildLoaders()` method.

<docs-code language="typescript">
const myComponentHarness = await loader.getHarness(MyComponent);

// Get loader for first instance of child element with '.child' selector
const childLoader = await myComponentHarness.getLoader('.child');

// Get loaders for all instances of child elements with '.child' selector
const allChildLoaders = await myComponentHarness.getAllChildLoaders('.child');
</docs-code>

### Filtering harnesses

When a page contains multiple instances of a particular component, you may want to filter based on some property of the component to get a particular component instance. You can use a <strong>harness predicate</strong>, a class used to associate a `ComponentHarness` class with predicates functions that can be used to filter component instances, to do so.

When you ask a `HarnessLoader` for a harness, you're actually providing a HarnessQuery. A query can be one of two things:

- A harness constructor. This just gets that harness
- A `HarnessPredicate`, which gets harnesses that are filtered based on one or more conditions

`HarnessPredicate` does support some base filters (selector, ancestor) that work on anything that extends `ComponentHarness`.

<docs-code language="typescript">
// Example of loading a MyButtonComponentHarness with a harness predicate
const disabledButtonPredicate = new HarnessPredicate(MyButtonComponentHarness, {selector: '[disabled]'});
const disabledButton = await loader.getHarness(disabledButtonPredicate);
</docs-code>

However it's common for harnesses to implement a static `with()` method that accepts component-specific filtering options and returns a `HarnessPredicate`.

<docs-code language="typescript">
// Example of loading a MyButtonComponentHarness with a specific selector
const button = await loader.getHarness(MyButtonComponentHarness.with({selector: 'btn'}))
</docs-code>

For more details refer to the specific harness documentation since additional filtering options are specific to each harness implementation.

## Using test harness APIs

While every harness defines an API specific to its corresponding component, they all share a common base class, [ComponentHarness](https://material.angular.io/cdk/test-harnesses/api#ComponentHarness). This base class defines a static property, `hostSelector`, that matches the harness class to instances of the component in the DOM.

Beyond that, the API of any given harness is specific to its corresponding component; refer to the component's documentation to learn how to use a specific harness.

As an example, the following is a test for a component that uses the [Angular Material slider component harness](https://material.angular.io/components/slider/api#MatSliderHarness):

<docs-code language="typescript">
it('should get value of slider thumb', async () => {
    const slider = await loader.getHarness(MatSliderHarness);
    const thumb = await slider.getEndThumb();
    expect(await thumb.getValue()).toBe(50);
});
</docs-code>

## Interop with Angular change detection

By default, test harnesses runs Angular's [change detection](https://angular.dev/best-practices/runtime-performance) before reading the state of a DOM element and after interacting with a DOM element.

There may be times that you need finer-grained control over change detection in your tests. such as checking the state of a component while an async operation is pending. In these cases use the `manualChangeDetection` function to disable automatic handling of change detection for a block of code.

<docs-code language="typescript">
it('checks state while async action is in progress', async () => {
  const buttonHarness = loader.getHarness(MyButtonHarness);
  await manualChangeDetection(async () => {
    await buttonHarness.click();
    fixture.detectChanges();
    // Check expectations while async click operation is in progress.
    expect(isProgressSpinnerVisible()).toBe(true);
    await fixture.whenStable();
    // Check expectations after async click operation complete.
    expect(isProgressSpinnerVisible()).toBe(false);
  });
});
</docs-code>

Almost all harness methods are asynchronous and return a `Promise` to support the following:

- Support for unit tests
- Support for end-to-end tests
- Insulate tests against changes in asynchronous behavior

The Angular team recommends using [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) to improve the test readability. Calling `await` blocks the execution of your test until the associated `Promise` resolves.

Occasionally, you may want to perform multiple actions simultaneously and wait until they're all done rather than performing each action sequentially. For example, read multiple properties of a single component. In these situations use the `parallel` function to parallelize the operations. The parallel function works similarly to `Promise.all`, while also optimizing change detection checks.

<docs-code language="typescript">
it('reads properties in parallel', async () => {
  const checkboxHarness = loader.getHarness(MyCheckboxHarness);
  // Read the checked and intermediate properties simultaneously.
  const [checked, indeterminate] = await parallel(() => [
    checkboxHarness.isChecked(),
    checkboxHarness.isIndeterminate()
  ]);
  expect(checked).toBe(false);
  expect(indeterminate).toBe(true);
});
</docs-code>

# Creating harnesses for your components

## Before you start

Tip: This guide assumes you've already read the [component harnesses overview guide](guide/testing/component-harnesses-overview). Read that first if you're new to using component harnesses.

### When does creating a test harness make sense?

The Angular team recommends creating component test harnesses for shared components that are used in many places and have some user interactivity. This most commonly applies to widget libraries and similar reusable components. Harnesses are valuable for these cases because they provide the consumers of these shared components a well- supported API for interacting with a component. Tests that use harnesses can avoid depending on unreliable implementation details of these shared components, such as DOM structure and specific event listeners.

For components that appear in only one place, such as a page in an application, harnesses don't provide as much benefit. In these situations, a component's tests can reasonably depend on the implementation details of this component, as the tests and components are updated at the same time. However, harnesses still provide some value if you would use the harness in both unit and end-to-end tests.

### CDK Installation

The [Component Dev Kit (CDK)](https://material.angular.io/cdk/categories) is a set of behavior primitives for building components. To use the component harnesses, first install `@angular/cdk` from npm. You can do this from your terminal using the Angular CLI:

<docs-code language="shell">
  ng add @angular/cdk
</docs-code>

## Extending `ComponentHarness`

The abstract `ComponentHarness` class is the base class for all component harnesses. To create a custom component harness, extend `ComponentHarness` and implement the static property `hostSelector`.

The `hostSelector` property identifies elements in the DOM that match this harness subclass. In most cases, the `hostSelector` should be the same as the selector of the corresponding `Component` or `Directive`. For example, consider a simple popup component:

<docs-code language="typescript">
@Component({
  selector: 'my-popup',
  template: `
    <button (click)="toggle()">{{triggerText()}}</button>
    @if (isOpen()) {
      <div class="my-popup-content"><ng-content></ng-content></div>
    }
  `
})
class MyPopup {
  triggerText = input('');

isOpen = signal(false);

toggle() {
this.isOpen.update((value) => !value);
}
}
</docs-code>

In this case, a minimal harness for the component would look like the following:

<docs-code language="typescript">
class MyPopupHarness extends ComponentHarness {
  static hostSelector = 'my-popup';
}
</docs-code>

While `ComponentHarness` subclasses require only the `hostSelector` property, most harnesses should also implement a static `with` method to generate `HarnessPredicate` instances. The [filtering harnesses section](guide/testing/using-component-harnesses#filtering-harnesses) covers this in more detail.

## Finding elements in the component's DOM

Each instance of a `ComponentHarness` subclass represents a particular instance of the corresponding component. You can access the component's host element via the `host() `method from the `ComponentHarness` base class.

`ComponentHarness` also offers several methods for locating elements within the component's DOM. These methods are `locatorFor()`, `locatorForOptional()`, and `locatorForAll()`. These methods create functions that find elements, they do not directly find elements. This approach safeguards against caching references to out-of-date elements. For example, when an `ngIf` hides and then shows an element, the result is a new DOM element; using functions ensures that tests always reference the current state of the DOM.

See the [ComponentHarness API reference page](https://material.angular.io/cdk/test-harnesses/api#ComponentHarness) for the full list details of the different `locatorFor` methods.

For example, the `MyPopupHarness` example discussed above could provide methods to get the trigger and content elements as follows:

<docs-code language="typescript">
class MyPopupHarness extends ComponentHarness {
  static hostSelector = 'my-popup';

/\*_ Gets the trigger element _/
getTriggerElement = this.locatorFor('button');

/\*_ Gets the content element. _/
getContentElement = this.locatorForOptional('.my-popup-content');
}
</docs-code>

## Working with `TestElement` instances

`TestElement` is an abstraction designed to work across different test environments (Unit tests, WebDriver, etc). When using harnesses, you should perform all DOM interaction via this interface. Other means of accessing DOM elements, such as `document.querySelector()`, do not work in all test environments.

`TestElement` has a number of methods to interact with the underlying DOM, such as `blur()`, `click()`, `getAttribute()`, and more. See the [TestElement API reference page](https://material.angular.io/cdk/test-harnesses/api#TestElement) for the full list of methods.

Do not expose `TestElement` instances to harness users unless it's an element the component consumer defines directly, such as the component's host element. Exposing `TestElement` instances for internal elements leads users to depend on a component's internal DOM structure.

Instead, provide more narrow-focused methods for specific actions the end-user may take or particular state they may observe. For example, `MyPopupHarness` from previous sections could provide methods like `toggle` and `isOpen`:

<docs-code language="typescript">
class MyPopupHarness extends ComponentHarness {
  static hostSelector = 'my-popup';

protected getTriggerElement = this.locatorFor('button');
protected getContentElement = this.locatorForOptional('.my-popup-content');

/\*_ Toggles the open state of the popup. _/
async toggle() {
const trigger = await this.getTriggerElement();
return trigger.click();
}

/\*_ Checks if the popup us open. _/
async isOpen() {
const content = await this.getContentElement();
return !!content;
}
}
</docs-code>

## Loading harnesses for subcomponents

Larger components often compose sub-components. You can reflect this structure in a component's harness as well. Each of the `locatorFor` methods on `ComponentHarness` has an alternate signature that can be used for locating sub-harnesses rather than elements.

See the [ComponentHarness API reference page](https://material.angular.io/cdk/test-harnesses/api#ComponentHarness) for the full list of the different locatorFor methods.

For example, consider a menu build using the popup from above:

<docs-code language="typescript">
@Directive({
  selector: 'my-menu-item'
})
class MyMenuItem {}

@Component({
selector: 'my-menu',
template: `  <my-popup>
      <ng-content></ng-content>
    </my-popup>`
})
class MyMenu {
triggerText = input('');

@ContentChildren(MyMenuItem) items: QueryList<MyMenuItem>;
}
</docs-code>

The harness for `MyMenu` can then take advantage of other harnesses for `MyPopup` and `MyMenuItem`:

<docs-code language="typescript">
class MyMenuHarness extends ComponentHarness {
  static hostSelector = 'my-menu';

protected getPopupHarness = this.locatorFor(MyPopupHarness);

/\*_ Gets the currently shown menu items (empty list if menu is closed). _/
getItems = this.locatorForAll(MyMenuItemHarness);

/\*_ Toggles open state of the menu. _/
async toggle() {
const popupHarness = await this.getPopupHarness();
return popupHarness.toggle();
}
}

class MyMenuItemHarness extends ComponentHarness {
static hostSelector = 'my-menu-item';
}
</docs-code>

## Filtering harness instances with `HarnessPredicate`

When a page contains multiple instances of a particular component, you may want to filter based on some property of the component to get a particular component instance. For example, you may want a button with some specific text, or a menu with a specific ID. The `HarnessPredicate` class can capture criteria like this for a `ComponentHarness` subclass. While the test author is able to construct `HarnessPredicate` instances manually, it's easier when the `ComponentHarness` subclass provides a helper method to construct predicates for common filters.

You should create a static `with()` method on each `ComponentHarness` subclass that returns a `HarnessPredicate` for that class. This allows test authors to write easily understandable code, e.g. `loader.getHarness(MyMenuHarness.with({selector: '#menu1'}))`. In addition to the standard selector and ancestor options, the `with` method should add any other options that make sense for the particular subclass.

Harnesses that need to add additional options should extend the `BaseHarnessFilters` interface and additional optional properties as needed. `HarnessPredicate` provides several convenience methods for adding options: `stringMatches()`, `addOption()`, and `add()`. See the [HarnessPredicate API page](https://material.angular.io/cdk/test-harnesses/api#HarnessPredicate) for the full description.

For example, when working with a menu it is useful to filter based on trigger text and to filter menu items based on their text:

<docs-code language="typescript">
interface MyMenuHarnessFilters extends BaseHarnessFilters {
  /** Filters based on the trigger text for the menu. */
  triggerText?: string | RegExp;
}

interface MyMenuItemHarnessFilters extends BaseHarnessFilters {
/\*_ Filters based on the text of the menu item. _/
text?: string | RegExp;
}

class MyMenuHarness extends ComponentHarness {
static hostSelector = 'my-menu';

/\*_ Creates a `HarnessPredicate` used to locate a particular `MyMenuHarness`. _/
static with(options: MyMenuHarnessFilters): HarnessPredicate<MyMenuHarness> {
return new HarnessPredicate(MyMenuHarness, options)
.addOption('trigger text', options.triggerText,
(harness, text) => HarnessPredicate.stringMatches(harness.getTriggerText(), text));
}

protected getPopupHarness = this.locatorFor(MyPopupHarness);

/\*_ Gets the text of the menu trigger. _/
async getTriggerText(): Promise<string> {
const popupHarness = await this.getPopupHarness();
return popupHarness.getTriggerText();
}
...
}

class MyMenuItemHarness extends ComponentHarness {
static hostSelector = 'my-menu-item';

/\*_ Creates a `HarnessPredicate` used to locate a particular `MyMenuItemHarness`. _/
static with(options: MyMenuItemHarnessFilters): HarnessPredicate<MyMenuItemHarness> {
return new HarnessPredicate(MyMenuItemHarness, options)
.addOption('text', options.text,
(harness, text) => HarnessPredicate.stringMatches(harness.getText(), text));
}

/\*_ Gets the text of the menu item. _/
async getText(): Promise<string> {
const host = await this.host();
return host.text();
}
}
</docs-code>

You can pass a `HarnessPredicate` instead of a `ComponentHarness` class to any of the APIs on `HarnessLoader`, `LocatorFactory`, or `ComponentHarness`. This allows test authors to easily target a particular component instance when creating a harness instance. It also allows the harness author to leverage the same `HarnessPredicate` to enable more powerful APIs on their harness class. For example, consider the `getItems` method on the `MyMenuHarness` shown above. Adding a filtering API allows users of the harness to search for particular menu items:

<docs-code language="typescript">
class MyMenuHarness extends ComponentHarness {
  static hostSelector = 'my-menu';

/\*_ Gets a list of items in the menu, optionally filtered based on the given criteria. _/
async getItems(filters: MyMenuItemHarnessFilters = {}): Promise<MyMenuItemHarness[]> {
const getFilteredItems = this.locatorForAll(MyMenuItemHarness.with(filters));
return getFilteredItems();
}
...
}
</docs-code>

## Creating `HarnessLoader` for elements that use content projection

Some components project additional content into the component's template. See the [content projection guide](guide/components/content-projection) for more information.

Add a `HarnessLoader` instance scoped to the element containing the `<ng-content>` when you create a harness for a component that uses content projection. This allows the user of the harness to load additional harnesses for whatever components were passed in as content. `ComponentHarness` has several methods that can be used to create HarnessLoader instances for cases like this: `harnessLoaderFor()`, `harnessLoaderForOptional()`, `harnessLoaderForAll()`. See the [HarnessLoader interface API reference page](https://material.angular.io/cdk/test-harnesses/api#HarnessLoader) for more details.

For example, the `MyPopupHarness` example from above can extend `ContentContainerComponentHarness` to add support to load harnesses within the `<ng-content>` of the component.

<docs-code language="typescript">
class MyPopupHarness extends ContentContainerComponentHarness<string> {
  static hostSelector = 'my-popup';
}
</docs-code>

## Accessing elements outside of the component's host element

There are times when a component harness might need to access elements outside of its corresponding component's host element. For example, code that displays a floating element or pop-up often attaches DOM elements directly to the document body, such as the `Overlay` service in Angular CDK.

In this case, `ComponentHarness` provides a method that can be used to get a `LocatorFactory` for the root element of the document. The `LocatorFactory` supports most of the same APIs as the `ComponentHarness` base class, and can then be used to query relative to the document's root element.

Consider if the `MyPopup` component above used the CDK overlay for the popup content, rather than an element in its own template. In this case, `MyPopupHarness` would have to access the content element via `documentRootLocatorFactory()` method that gets a locator factory rooted at the document root.

<docs-code language="typescript">
class MyPopupHarness extends ComponentHarness {
  static hostSelector = 'my-popup';

/\*_ Gets a `HarnessLoader` whose root element is the popup's content element. _/
async getHarnessLoaderForContent(): Promise<HarnessLoader> {
const rootLocator = this.documentRootLocatorFactory();
return rootLocator.harnessLoaderFor('my-popup-content');
}
}
</docs-code>

## Waiting for asynchronous tasks

The methods on `TestElement` automatically trigger Angular's change detection and wait for tasks inside the `NgZone`. In most cases no special effort is required for harness authors to wait on asynchronous tasks. However, there are some edge cases where this may not be sufficient.

Under some circumstances, Angular animations may require a second cycle of change detection and subsequent `NgZone` stabilization before animation events are fully flushed. In cases where this is needed, the `ComponentHarness` offers a `forceStabilize()` method that can be called to do the second round.

You can use `NgZone.runOutsideAngular()` to schedule tasks outside of NgZone. Call the `waitForTasksOutsideAngular()` method on the corresponding harness if you need to explicitly wait for tasks outside `NgZone` since this does not happen automatically.

# Adding harness support for additional testing environments

## Before you start

Tip: This guide assumes you've already read the [component harnesses overview guide](guide/testing/component-harnesses-overview). Read that first if you're new to using component harnesses.

### When does adding support for a test environment make sense?

To use component harnesses in the following environments, you can use Angular CDK's two built-in environments:

- Unit tests
- WebDriver end-to-end tests

To use a supported testing environment, read the [Creating harnesses for your components guide](guide/testing/creating-component-harnesses).

Otherwise, to add support for other environments, you need to define how to interact with a DOM element and how DOM interactions work in your environment. Continue reading to learn more.

### CDK Installation

The [Component Dev Kit (CDK)](https://material.angular.io/cdk/categories) is a set of behavior primitives for building components. To use the component harnesses, first install `@angular/cdk` from npm. You can do this from your terminal using the Angular CLI:

<docs-code language="shell">
  ng add @angular/cdk
</docs-code>

## Creating a `TestElement` implementation

Every test environment must define a `TestElement` implementation. The `TestElement` interface serves as an environment-agnostic representation of a DOM element. It enables harnesses to interact with DOM elements regardless of the underlying environment. Because some environments don't support interacting with DOM elements synchronously (e.g. WebDriver), all `TestElement` methods are asynchronous, returning a `Promise` with the result of the operation.

`TestElement` offers a number of methods to interact with the underlying DOM such as `blur()`, `click()`, `getAttribute()`, and more. See the [TestElement API reference page](https://material.angular.io/cdk/test-harnesses/api#TestElement) for the full list of methods.

The `TestElement` interface consists largely of methods that resemble methods available on `HTMLElement`. Similar methods exist in most test environments, which makes implementing the methods fairly straightforward. However, one important difference to note when implementing the `sendKeys` method, is that the key codes in the `TestKey` enum likely differ from the key codes used in the test environment. Environment authors should maintain a mapping from `TestKey` codes to the codes used in the particular testing environment.

The [UnitTestElement](https://github.com/angular/components/blob/main/src/cdk/testing/testbed/unit-test-element.ts#L33) and [SeleniumWebDriverElement](https://github.com/angular/components/blob/main/src/cdk/testing/selenium-webdriver/selenium-webdriver-keys.ts#L16) implementations in Angular CDK serve as good examples of implementations of this interface.

## Creating a `HarnessEnvironment` implementation

Test authors use `HarnessEnvironment` to create component harness instances for use in tests. `HarnessEnvironment` is an abstract class that must be extended to create a concrete subclass for the new environment. When supporting a new test environment, create a `HarnessEnvironment` subclass that adds concrete implementations for all abstract members.

`HarnessEnvironment` has a generic type parameter: `HarnessEnvironment<E>`. This parameter, `E`, represents the raw element type of the environment. For example, this parameter is Element for unit test environments.

The following are the abstract methods that must be implemented:

| Method                                                       | Description                                                                                                                                                          |
| :----------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `abstract getDocumentRoot(): E`                              | Gets the root element for the environment (e.g. `document.body`).                                                                                                    |
| `abstract createTestElement(element: E): TestElement`        | Creates a `TestElement` for the given raw element.                                                                                                                   |
| `abstract createEnvironment(element: E): HarnessEnvironment` | Creates a `HarnessEnvironment` rooted at the given raw element.                                                                                                      |
| `abstract getAllRawElements(selector: string): Promise<E[]>` | Gets all of the raw elements under the root element of the environment matching the given selector.                                                                  |
| `abstract forceStabilize(): Promise<void>`                   | Gets a `Promise` that resolves when the `NgZone` is stable. Additionally, if applicable, tells `NgZone` to stabilize (e.g. calling `flush()` in a `fakeAsync` test). |
| `abstract waitForTasksOutsideAngular(): Promise<void>`       | Gets a `Promise` that resolves when the parent zone of `NgZone` is stable.                                                                                           |

In addition to implementing the missing methods, this class should provide a way for test authors to get `ComponentHarness` instances. You should define a protected constructor and provide a static method called `loader` that returns a `HarnessLoader` instance. This allows test authors to write code like: `SomeHarnessEnvironment.loader().getHarness(...)`. Depending on the needs of the particular environment, the class may provide several different static methods or require arguments to be passed. (e.g. the `loader` method on `TestbedHarnessEnvironment` takes a `ComponentFixture`, and the class provides additional static methods called `documentRootLoader` and `harnessForFixture`).

The [`TestbedHarnessEnvironment`](https://github.com/angular/components/blob/main/src/cdk/testing/testbed/testbed-harness-environment.ts#L89) and [SeleniumWebDriverHarnessEnvironment](https://github.com/angular/components/blob/main/src/cdk/testing/selenium-webdriver/selenium-web-driver-harness-environment.ts#L71) implementations in Angular CDK serve as good examples of implementations of this interface.

## Handling auto change detection

In order to support the `manualChangeDetection` and parallel APIs, your environment should install a handler for the auto change detection status.

When your environment wants to start handling the auto change detection status it can call `handleAutoChangeDetectionStatus(handler)`. The handler function will receive a `AutoChangeDetectionStatus` which has two properties `isDisabled` and `onDetectChangesNow()`. See the [AutoChangeDetectionStatus API reference page](https://material.angular.io/cdk/test-harnesses/api#AutoChangeDetectionStatus) for more information.
If your environment wants to stop handling auto change detection status it can call `stopHandlingAutoChangeDetectionStatus()`.

https://claude.ai/share/3768acea-2f8f-49d2-add5-fd6498581176

この階層構造と`angular.json`の設定を踏まえると、Karma の設定は以下のように行うとよいでしょう。

## Karma 設定の配置場所

マルチプロジェクト構成では、通常以下の 2 つのアプローチがあります：

### 1. 共通の単一の karma.conf.js を使用する場合

ルートディレクトリ（angular.json と同じ階層）に`karma.conf.js`を配置します：

```
root
|--a
|--b
|--c
|--common
|--d
|--angular.json
|--package.json
|--karma.conf.js  <- ここに配置
```

こうすることで、すべてのサブプロジェクト（a,b,c,common,d）は同じ Karma 設定を共有できます。

### 2. プロジェクト固有の karma.conf.js を使用する場合

各サブディレクトリに独自の karma.conf.js を配置します：

```
root
|--a
|  |--karma.conf.js
|--b
|  |--karma.conf.js
|--c
|  |--karma.conf.js
|--common
|  |--karma.conf.js
|--d
|  |--karma.conf.js
|--angular.json
|--package.json
```

そして`angular.json`の各プロジェクトの設定でそれぞれの karma.conf.js を指定します。

## 推奨アプローチと設定内容

共有アセットやエントリーポイントが`common`ディレクトリにある構成から判断すると、**共通の単一の karma.conf.js**を使用するのが最も効率的でしょう。

### ルートディレクトリの karma.conf.js 例：

```javascript
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
    customLaunchers: {
      ChromeHeadlessCI: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-gpu"],
      },
    },
    singleRun: false,
    restartOnFileChange: true,
    files: [
      // 必要に応じて共通のファイルを追加
    ],
  });
};
```

### angular.json の修正ポイント

`angular.json`の各プロジェクトの`test`セクションで、この共通の karma.conf.js を参照します：

```json
"test": {
  "builder": "@angular-devkit/build-angular:karma",
  "options": {
    "main": "./common/src/test.ts",
    "polyfills": ["./common/src/polyfills.ts"],
    "tsConfig": "tsconfig.spec.json",
    "karmaConfig": "karma.conf.js",  // ルートディレクトリのkarma.conf.jsを参照
    "assets": ["./common/src/favicon.ico", "./common/src/assets"],
    "styles": [
      "./common/src/styles.css",
      "./common/src/styles.common.css"
    ],
    "scripts": []
  }
}
```

この設定では、各プロジェクト（a,b,c,common,d）は共通のテスト設定を使用しますが、TSConfig やエントリーポイント、アセットなどの特定の側面は`angular.json`内でプロジェクトごとにカスタマイズできます。

複数のプロジェクトがある場合、テストを効率よく実行するために、環境変数や引数を使用して特定のプロジェクトのテストのみを実行する機能を`karma.conf.js`に追加することも検討してください。
