## ローカルに新しいプロジェクトを設定する

新しいプロジェクトを開始する場合、Git などのツールを使用するために、ローカルにプロジェクトを作成するのが一般的です。

### 前提条件

- **Node.js** - v[^18.19.1 以降](/reference/versions)
- **テキストエディタ** - [Visual Studio Code](https://code.visualstudio.com/)を推奨
- **ターミナル** - Angular CLI コマンドを実行するために必要

### 手順

以下のガイドは、ローカルに Angular プロジェクトを設定する手順を説明します。

#### Angular CLI をインストールする

ターミナルを開き（[Visual Studio Code](https://code.visualstudio.com/)を使用している場合は、[統合ターミナル](https://code.visualstudio.com/docs/editor/integrated-terminal)を開くことができます）、次のコマンドを実行します。

<docs-code language="shell">

npm install -g @angular/cli

</docs-code>

Windows または Unix でこのコマンドを実行する際に問題が発生した場合は、[CLI ドキュメント](/tools/cli/setup-local#install-the-angular-cli)を参照してください。

#### 新しいプロジェクトを作成する

ターミナルで、CLI コマンド`ng new`を実行し、目的のプロジェクト名を入力します。次の例では、`my-first-angular-app`というプロジェクト名を使用します。

<docs-code language="shell">

ng new <project-name>

</docs-code>

プロジェクトの設定に関するいくつかのオプションが表示されます。矢印キーと Enter キーを使ってナビゲートし、必要なオプションを選択します。

特に好みがなければ、Enter キーを押してデフォルトのオプションを採用し、設定を続行してください。

設定オプションを選択し、CLI がセットアップを実行すると、次のようなメッセージが表示されます。

```shell
✔ Packages installed successfully.
    Successfully initialized git.
```

これで、ローカルにプロジェクトを実行する準備が整いました！

#### ローカルに新しいプロジェクトを実行する

ターミナルで、新しい Angular プロジェクトに切り替えます。

<docs-code language="shell">

cd my-first-angular-app

</docs-code>

この時点で、すべての依存関係がインストールされているはずです（プロジェクト内に`node_modules`フォルダが存在することを確認できます）。次のコマンドを実行してプロジェクトを開始できます。

<docs-code language="shell">

npm start

</docs-code>

すべてが正常に完了すると、ターミナルに次のような確認メッセージが表示されます。

```shell
Watch mode enabled. Watching for file changes...
NOTE: Raw file sizes do not reflect development server per-request transformations.
  ➜  Local:   http://localhost:4200/
  ➜  press h + enter to show help
```

これで、`Local`のパス（例：`http://localhost:4200`）にアクセスしてアプリケーションを確認できます。コーディングを楽しんでください！🎉

## 次のステップ

Angular プロジェクトを作成したので、[基本概念ガイド](/essentials)で Angular の詳細について学ぶか、詳しいガイドからトピックを選択してください！
